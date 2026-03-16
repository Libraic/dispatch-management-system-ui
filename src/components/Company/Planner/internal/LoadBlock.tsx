import {
  type DriverLoadData,
  LoadBlockColor,
  type LoadData,
  LoadStatusColor,
} from "../../../../types/internal/planner/planner-types.ts";
import React from "react";
import { toIsoDate } from "../../../../utils/global/date-utils.ts";
import {
  DAY_CELL_WIDTH,
  METADATA_WIDTH,
} from "../../../../constants/planner/planner-constants.ts";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_NORMAL,
  SYSTEM_FONT_THIN,
} from "../../../../tailwind/tailwind-font-vars.ts";
import { LoadFormModal } from "./LoadFormModal.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { useContextMenu } from "../../../../hooks/useContextMenu.ts";
import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";
import {
  deleteLoadByUuid,
  getLoadData,
} from "../../../../service/loadsService.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import { fromLoadResponseToLoadData } from "../../../../utils/planner/planner-utils.ts";
import { ContextMenu } from "../../../Common/ContextMenu/public/ContextMenu.tsx";

import removeWhiteIcon from "../../../../assets/planner/load-menu/remove-white.svg";
import removeBlackIcon from "../../../../assets/planner/load-menu/remove-black.svg";
import pickUpIcon from "../../../../assets/planner/locations/pickup-unfocused.svg";
import deliveryIcon from "../../../../assets/planner/locations/delivery-unfocused.svg";

const getDayIndex = (date: Date, days: string[]): number => {
  const target = toIsoDate(date);
  return days.findIndex((d) => d === target);
};

export const LoadBlock: React.FC<{
  driverLoadData: DriverLoadData;
  load: LoadData;
  days: string[];
  postDeleteUpdateFn: (driver: DriverData, loadDataList: LoadData[]) => void;
}> = ({ driverLoadData, load, days, postDeleteUpdateFn }) => {
  const firstLocation = load.locations[0];
  const lastLocation = load.locations[load.locations.length - 1];
  const startIndex = getDayIndex(load.startDate, days);
  const endIndex = getDayIndex(load.endDate, days);
  const clampedStart = Math.max(startIndex === -1 ? 0 : startIndex, 0);
  const clampedEnd = Math.min(endIndex === -1 ? 13 : endIndex, 13);
  const leftRem = METADATA_WIDTH + clampedStart * DAY_CELL_WIDTH;
  const widthRem = (clampedEnd - clampedStart + 1) * DAY_CELL_WIDTH;

  const loadFormActivator = useActivator();
  const toast = useToast();

  const backgroundColor = LoadBlockColor[load.loadStatus];
  const loadStatusTextColor = LoadStatusColor[load.loadStatus];

  const contextMenu = useContextMenu();
  const actionItems: ContextMenuActionItem[] = [
    {
      activeIcon: removeWhiteIcon,
      inactiveIcon: removeBlackIcon,
      label: "Delete",
      action: async () => {
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
          fromLoadResponseToLoadData(loadResponse),
        );
        postDeleteUpdateFn(driverLoadData.driver!!, loadDataList);
      },
    },
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
        left: `${leftRem}rem`,
        width: `${widthRem}rem`,
      }}
    >
      <div
        className={`
          relative h-full mx-1
          rounded-lg
          ${backgroundColor}
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
            <p>{firstLocation.location}</p>
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
              className={`text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] ${loadStatusTextColor} ${SYSTEM_FONT_BOLD}`}
            >
              {load.loadStatus}
            </p>
            <p>{lastLocation.location}</p>
          </div>
        </div>
      </div>
      {loadFormActivator.isActive() && (
        <LoadFormModal
          loadUuid={load.id}
          deactivate={loadFormActivator.deactivate}
          upsertLoadData={() => {}}
          driverLoadData={driverLoadData}
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
