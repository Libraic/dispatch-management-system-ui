import React, { useEffect, useState } from "react";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import chevronRightIcon from "../../../../assets/trucks-board/chevron-right.svg";
import chevronDownIcon from "../../../../assets/trucks-board/chevron-down.svg";
import type { DispatcherLoadData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Activator } from "../../../../hooks/useActivator.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import {
  TRUCKS_BOARD_GRID_LAYOUT,
  TRUCKS_BOARD_ROW_HEIGHT,
  TRUCKS_BOARD_TEXT_SIZE,
} from "../../../../constants/trucks-board/trucks-board-constants.ts";

export const TrucksBoardDispatcherRow: React.FC<{
  dispatcherLoadData: DispatcherLoadData;
  expander: Activator;
}> = ({ dispatcherLoadData, expander }) => {
  const [activeIcon, setActiveIcon] = useState(BLANK_STRING);

  useEffect(() => {
    if (dispatcherLoadData.driverLoads.length === 0) {
      setActiveIcon(BLANK_STRING);
    } else {
      const icon = expander.isActive() ? chevronDownIcon : chevronRightIcon;
      setActiveIcon(icon);
    }
  }, [expander, dispatcherLoadData.driverLoads.length]);

  return (
    <div className="relative flex flex-row">
      {activeIcon !== BLANK_STRING && (
        <img
          src={activeIcon}
          alt="chevron-right"
          className="absolute w-7 h-7 z-[999] mt-[1.3rem] left-[0.5rem] hover:cursor-pointer"
          onClick={() => {
            setActiveIcon((prev) => {
              return prev === chevronRightIcon
                ? chevronDownIcon
                : chevronRightIcon;
            });
            expander.change();
          }}
        />
      )}
      <div
        className={`grid ${TRUCKS_BOARD_GRID_LAYOUT} ${TRUCKS_BOARD_TEXT_SIZE} items-center ${TRUCKS_BOARD_ROW_HEIGHT} border-b-1 ${TABLE_BORDER_BASE_COLOR} bg-gray-200/85`}
      >
        <div
          className={`flex items-center px-10 ${SYSTEM_FONT_LIGHT} h-full border-x-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {dispatcherLoadData.dispatcher &&
            dispatcherLoadData.dispatcher.renderOnForm()}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatCurrency(dispatcherLoadData.totalRevenue)}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatNumber(dispatcherLoadData.totalMiles)}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
        >
          {formatNumber(
            divide(
              dispatcherLoadData.totalRevenue,
              dispatcherLoadData.totalMiles,
            ),
          )}
        </div>
        <div
          className={`border-r-1 ${TABLE_BORDER_BASE_COLOR} w-[112rem] h-full`}
        ></div>
      </div>
    </div>
  );
};
