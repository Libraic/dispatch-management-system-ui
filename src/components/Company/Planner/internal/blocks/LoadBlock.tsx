import {
  type DriverWorkforce,
  type LoadData,
  type LoadStatus,
} from "../../../../../types/internal/planner/planner-types.ts";
import React, { useContext } from "react";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../../tailwind/tailwind-font-vars.ts";
import { useActivator } from "../../../../../hooks/useActivator.ts";
import { useToast } from "../../../../../hooks/useToast.ts";
import { useContextMenu } from "../../../../../hooks/useContextMenu.ts";
import type { ContextMenuActionItem } from "../../../../../types/internal/common/context-menu-types.ts";
import {
  deleteLoadByUuid,
  getLoadData,
} from "../../../../../service/loadService.ts";
import { getStartingPointAndWidthOfBlock } from "../../../../../utils/planner/planner-utils.ts";
import { ContextMenu } from "../../../../Common/ContextMenu/public/ContextMenu.tsx";
import pickUpIcon from "../../../../../assets/planner/blocks/pickup.svg";
import deliveryIcon from "../../../../../assets/planner/blocks/delivery.svg";
import {
  getChangeStatusOptions,
  getDeleteOption,
} from "../../../../../utils/context-menu/context-menu-utils.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { SchedulableModal } from "../forms/SchedulableModal.tsx";
import { fromGetLoadResponseToLoadData } from "../../../../../utils/planner/load-utils.ts";

const loadStatusColor: Record<
  LoadStatus,
  { textColor: string; backgroundColor: string }
> = {
  Booked: {
    textColor: "text-[#2F5FA8]",
    backgroundColor: "bg-[#E6F0FF]",
  },
  Dispatched: {
    textColor: "text-[#6B4FD3]",
    backgroundColor: "bg-[#EDE9FE]",
  },
  Transit: {
    textColor: "text-[#B7791F]",
    backgroundColor: "bg-[#FFF4D6]",
  },
  Delivered: {
    textColor: "text-[#2F855A]",
    backgroundColor: "bg-[#E6F7EF]",
  },
  "Docs Sent": {
    textColor: "text-[#7E22CE]",
    backgroundColor: "bg-[#F3E8FF]",
  },
  Invoiced: {
    textColor: "text-[#C53030]",
    backgroundColor: "bg-[#FFE9EC]",
  },
  Paid: {
    textColor: "text-[#0F766E]",
    backgroundColor: "bg-[#E6FBF4]",
  },
};

export const LoadBlock: React.FC<{
  driverLoadData: DriverWorkforce;
  load: LoadData;
}> = ({ driverLoadData, load }) => {
  const background = loadStatusColor[load.loadStatus].backgroundColor;
  const textColor = loadStatusColor[load.loadStatus].textColor;
  const context = useContext(DispatchingContext)!!;
  const days = context.days;
  const firstLocation = load.locations[0];
  const lastLocation = load.locations[load.locations.length - 1];
  const { startingPoint, width } = getStartingPointAndWidthOfBlock(
    load.startDate,
    load.endDate,
    days,
    firstLocation.time,
    lastLocation.time,
  );

  const loadFormActivator = useActivator();
  const toast = useToast();

  const updateStatusFn = (loadStatus: LoadStatus) => {
    context.upsertLoadDataFn(driverLoadData, load, loadStatus);
  };

  const deleteAction = async () => {
    if (!load.id) {
      return;
    }

    const data = await deleteLoadByUuid(load.id);
    if (data.error) {
      toast.withErrorMessage(data.error.message);
      return;
    }

    const startDate = new Date(days[0]);
    const endDate = new Date(days[days.length - 1]);
    const getLoadResponse = await getLoadData(
      driverLoadData.relationId,
      startDate,
      endDate,
    );
    if (getLoadResponse.error) {
      toast.withErrorMessage(getLoadResponse.error.message);
      return;
    }

    const loadResponses = getLoadResponse.data!!;
    const loadDataList = loadResponses.map((loadResponse) =>
      fromGetLoadResponseToLoadData(loadResponse),
    );
    context!!.postLoadDeleteUpdateFn(driverLoadData.driver!!, loadDataList);
  };

  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [
    ...getChangeStatusOptions(updateStatusFn),
    getDeleteOption(deleteAction),
  ];
  return (
    <div
      className="absolute top-2 h-[3.6rem] pointer-events-auto"
      onDoubleClick={() => loadFormActivator.change()}
      onContextMenu={(e: React.MouseEvent) => {
        if (!loadFormActivator.isActive()) {
          contextMenu.open(e);
        }
      }}
      onClick={contextMenu.close}
      style={{
        left: `${startingPoint}rem`,
        width: `${width}rem`,
      }}
    >
      <div
        className={`
          relative h-full mx-1
          rounded-lg
          ${background}
          flex items-center justify-between
          px-3
          shadow-sm
          cursor-pointer
          overflow-hidden
          whitespace-nowrap
          text-ellipsis 
          ${SYSTEM_FONT_NORMAL} text-[0.8rem]
        `}
      >
        <div className="flex items-center gap-2">
          <img src={pickUpIcon} alt="pickup" className="w-5 h-5" />
          <div>
            <p className="text-center text-[0.6rem]">{load.broker}</p>
            <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>
              {firstLocation.location}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center mx-2 min-w-0">
          <div className="flex-1 h-[0.05rem] bg-current opacity-50" />
          <span
            className={`text-[0.8rem] opacity-50 ${SYSTEM_FONT_THIN} mb-[0.081rem]`}
          >
            ›
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={deliveryIcon} alt="delivery" className="w-5 h-5" />
          <div>
            <p
              className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] ${textColor} ${SYSTEM_FONT_BOLD}`}
            >
              {load.loadStatus}
            </p>
            <p className={`${SYSTEM_FONT_BOLD} text-[0.7rem]`}>
              {lastLocation.location}
            </p>
          </div>
        </div>
      </div>
      {loadFormActivator.isActive() && (
        <SchedulableModal
          deactivate={loadFormActivator.deactivate}
          props={{
            id: load.id,
            calendarBookModalType: "Load",
            workforce: driverLoadData,
          }}
        />
      )}
      {contextMenu.isActive() && (
        <ContextMenu
          x={contextMenu.getX()}
          y={contextMenu.getY()}
          deactivateContextMenuFn={contextMenu.close}
          actions={actionItems}
        />
      )}
    </div>
  );
};
