import React, { useEffect, useState } from "react";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { DispatchCalendarCell } from "./DispatchCalendarCell.tsx";
import chevronRightIcon from "../../../../assets/trucks-board/chevron-right.svg";
import chevronDownIcon from "../../../../assets/trucks-board/chevron-down.svg";
import type { DispatcherMileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Activator } from "../../../../hooks/useActivator.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import {
  TABLE_BORDER_BASE_COLOR,
  TABLE_DELIMITER_BOTTOM_COLOR,
  TABLE_DELIMITER_LEFT_COLOR,
  TABLE_DELIMITER_RIGHT_COLOR,
  TABLE_RIGHT_BORDER_BASE_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import {
  TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER,
  TABLE_DELIMITER_THICKNESS_LEFT_BORDER,
  TABLE_DELIMITER_THICKNESS_RIGHT_BORDER,
  TABLE_NORMAL_THICKNESS_BOTTOM_BORDER,
  TABLE_NORMAL_THICKNESS_RIGHT_BORDER,
  TABLE_NORMAL_THICKNESS_X_BORDER,
} from "../../../../tailwind/tailwind-border-vars.ts";
import {
  TRUCKS_BOARD_GRID_LAYOUT,
  TRUCKS_BOARD_ROW_HEIGHT,
  TRUCKS_BOARD_TEXT_SIZE,
} from "../../../../constants/trucks-board/trucks-board-constants.ts";

export const TrucksBoardDispatcherRow: React.FC<{
  days: string[];
  dispatcherMileageData: DispatcherMileageData;
  expander: Activator;
  styles?: string;
}> = ({ days, dispatcherMileageData, expander, styles }) => {
  const [activeIcon, setActiveIcon] = useState(BLANK_STRING);

  useEffect(() => {
    if (dispatcherMileageData.driverMileageDataList.length === 0) {
      setActiveIcon(BLANK_STRING);
    } else {
      const icon = expander.isActive() ? chevronDownIcon : chevronRightIcon;
      setActiveIcon(icon);
    }
  }, [expander, dispatcherMileageData.driverMileageDataList.length]);

  const bottom = !expander.isActive()
    ? `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}`
    : BLANK_STRING;

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
        className={`grid ${TRUCKS_BOARD_GRID_LAYOUT} ${TRUCKS_BOARD_TEXT_SIZE} items-center ${TRUCKS_BOARD_ROW_HEIGHT} ${expander.isActive() ? `${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BORDER_BASE_COLOR}` : BLANK_STRING} bg-blue-grey flex-shrink-0`}
      >
        <div
          className={`
              flex items-center px-10 ${SYSTEM_FONT_LIGHT} h-full 
              ${TABLE_NORMAL_THICKNESS_X_BORDER} ${TABLE_BORDER_BASE_COLOR}
              ${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} ${TABLE_DELIMITER_LEFT_COLOR}
              ${bottom}
            `}
        >
          {dispatcherMileageData.dispatcher &&
            dispatcherMileageData.dispatcher.renderOnForm()}
        </div>
        <div
          className={`h-full ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR} ${bottom}`}
        ></div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR} ${bottom}`}
        >
          {formatCurrency(dispatcherMileageData.totalRevenue)}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR} ${bottom}`}
        >
          {formatNumber(dispatcherMileageData.totalMiles)}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full ${TABLE_BORDER_BASE_COLOR} ${bottom}`}
        >
          {formatNumber(
            divide(
              dispatcherMileageData.totalRevenue,
              dispatcherMileageData.totalMiles,
            ),
          )}
        </div>
        {days.map((day, index) => (
          <DispatchCalendarCell
            key={day}
            day={day}
            isEditable={false}
            styles={`${index <= 6 && (styles ?? BLANK_STRING)} ${index === 0 && `${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} ${TABLE_DELIMITER_LEFT_COLOR}`} ${index === 6 ? `${TABLE_DELIMITER_THICKNESS_RIGHT_BORDER} ${TABLE_DELIMITER_RIGHT_COLOR}` : `${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR}`} ${!expander.isActive() ? `${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BORDER_BASE_COLOR}` : BLANK_STRING} border-t-0 bg-blue-grey`}
          />
        ))}
      </div>
    </div>
  );
};
