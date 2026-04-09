import {
  type DriverWorkforce,
  type LoadData,
  type LoadLocationData,
  type LoadStatus,
} from "../../../../../types/internal/planner/planner-types.ts";
import React, { useContext } from "react";
import { SYSTEM_FONT_NORMAL } from "../../../../../tailwind/tailwind-font-vars.ts";
import { useActivator } from "../../../../../hooks/useActivator.ts";
import { useToast } from "../../../../../hooks/useToast.ts";
import { useContextMenu } from "../../../../../hooks/useContextMenu.ts";
import type { ContextMenuActionItem } from "../../../../../types/internal/common/context-menu-types.ts";
import {
  deleteLoadByUuid,
  getLoadData,
  upsertLoad,
} from "../../../../../service/loadService.ts";
import { getStartingPointAndWidthOfBlock } from "../../../../../utils/planner/planner-utils.ts";
import { ContextMenu } from "../../../../Common/ContextMenu/public/ContextMenu.tsx";
import {
  getChangeStatusOptions,
  getDeleteOption,
} from "../../../../../utils/context-menu/context-menu-utils.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { SchedulableModal } from "../forms/SchedulableModal.tsx";
import { fromGetLoadResponseToLoadData } from "../../../../../utils/planner/load-utils.ts";
import { LoadBlockDetails } from "./LoadBlockDetails.tsx";

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

const getFirstPickUpLocation = (locations: LoadLocationData[]) => {
  for (const location of locations) {
    if (location.label === "Pick Up") {
      return location;
    }
  }

  return undefined;
};

const getLastDeliveryLocation = (locations: LoadLocationData[]) => {
  for (let i = locations.length - 1; i >= 0; i--) {
    if (locations[i].label === "Delivery") {
      return locations[i];
    }
  }

  return undefined;
};

export const LoadBlock: React.FC<{
  driverLoadData: DriverWorkforce;
  load: LoadData;
}> = ({ driverLoadData, load }) => {
  const background = loadStatusColor[load.loadStatus].backgroundColor;
  const textColor = loadStatusColor[load.loadStatus].textColor;
  const context = useContext(DispatchingContext)!!;
  const days = context.days;
  const firstLocation = getFirstPickUpLocation(load.locations)!!;
  const lastLocation = getLastDeliveryLocation(load.locations)!!;
  const { startingPoint, width } = getStartingPointAndWidthOfBlock(
    firstLocation.date,
    lastLocation.date,
    days,
    firstLocation!!.time,
    lastLocation!!.time,
  );

  const loadFormActivator = useActivator();
  const toast = useToast();

  const updateStatusFn = async (loadStatus: LoadStatus) => {
    const upsertLoadResponse = await upsertLoad(
      load,
      driverLoadData.relationId,
      loadStatus,
    );

    if (!upsertLoadResponse.ok) {
      toast.withErrorMessage(upsertLoadResponse.error);
      return;
    }

    if (upsertLoadResponse.ok) {
      const newLoadData = fromGetLoadResponseToLoadData(
        upsertLoadResponse.data,
      );
      context.upsertLoadFn(driverLoadData, newLoadData);
    }
  };

  const deleteAction = async () => {
    const data = await deleteLoadByUuid(load.id!!);
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
        <LoadBlockDetails
          textColor={textColor}
          load={load}
          startLocation={firstLocation.location}
          endLocation={lastLocation.location}
          width={width}
        />
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
