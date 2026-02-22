import React from "react";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { DriverCalendarCell } from "./DriverCalendarCell.tsx";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import {
  TABLE_BORDER_BASE_COLOR,
  TABLE_BOTTOM_BORDER_BASE_COLOR,
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
  TABLE_NORMAL_THICKNESS_LEFT_BORDER,
  TABLE_NORMAL_THICKNESS_RIGHT_BORDER,
} from "../../../../tailwind/tailwind-border-vars.ts";
import clsx from "clsx";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";

export const TrucksBoardDriverRow: React.FC<{
  days: string[];
  driverMileageData: DriverMileageData;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  hasDispatcher: boolean;
  isLastDriver: boolean;
  isLastDriverForDispatcher: boolean;
}> = ({
  days,
  driverMileageData,
  upsertDriverMileageData,
  hasDispatcher,
  isLastDriver,
  isLastDriverForDispatcher,
}) => {
  const gridCols = hasDispatcher
    ? "grid-cols-[11.95rem_12rem_8rem_6rem_5.93rem_repeat(14,5rem)]"
    : "grid-cols-[11.95rem_12.05rem_8rem_6rem_5.94rem_repeat(14,5rem)]";

  const prepareStyles = (dayIndex: number) => {
    const xBorder =
      dayIndex === 0
        ? `${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} ${TABLE_DELIMITER_LEFT_COLOR} ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR}`
        : `border-l-0 ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_RIGHT_BORDER_BASE_COLOR}`;
    const rightBorder =
      dayIndex === 6 &&
      `${TABLE_DELIMITER_THICKNESS_RIGHT_BORDER} ${TABLE_DELIMITER_RIGHT_COLOR}`;
    const bottomBorder =
      isLastDriver && dayIndex <= 6
        ? `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}`
        : `${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BOTTOM_BORDER_BASE_COLOR}`;
    return `${xBorder} ${rightBorder} ${bottomBorder}`;
  };

  const bottom = isLastDriverForDispatcher
    ? `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}`
    : BLANK_STRING;

  return (
    <div className="flex flex-row">
      <div
        className={clsx(`
          grid ${gridCols} items-center h-[4rem] bg-gray-50 
          ${hasDispatcher && TABLE_NORMAL_THICKNESS_LEFT_BORDER} 
          ${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BORDER_BASE_COLOR}
          ${TABLE_DELIMITER_LEFT_COLOR} ${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} 
          flex-shrink-0 text-[0.9rem]
        `)}
      >
        <div
          className={clsx(`
            h-full 
            ${hasDispatcher && `${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BORDER_BASE_COLOR}`} 
            bg-white
            ${bottom}
          `)}
        ></div>
        <div
          className={clsx(`
            flex items-center px-10 ${SYSTEM_FONT_LIGHT} h-full 
            ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} 
            ${!hasDispatcher && TABLE_NORMAL_THICKNESS_LEFT_BORDER}
            ${TABLE_BORDER_BASE_COLOR}
            ${bottom}
          `)}
        >
          {driverMileageData.driver && driverMileageData.driver.renderOnForm()}
        </div>
        <div
          className={`
            flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full 
            ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_BORDER_BASE_COLOR}
            ${bottom}
          `}
        >
          {formatCurrency(driverMileageData.totalRevenue)}
        </div>
        <div
          className={`
            flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full 
            ${TABLE_NORMAL_THICKNESS_RIGHT_BORDER} ${TABLE_BORDER_BASE_COLOR}
            ${bottom}
          `}
        >
          {formatNumber(driverMileageData.totalMiles)}
        </div>
        <div
          className={`
            flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full ${TABLE_BORDER_BASE_COLOR} 
            ${bottom}
          `}
        >
          {formatNumber(
            divide(
              driverMileageData.totalRevenue,
              driverMileageData.totalMiles,
            ),
          )}
        </div>
        {Array.from({ length: 14 }).map((_, index) => (
          <DriverCalendarCell
            key={index}
            day={days[index]}
            upsertDriverMileageData={upsertDriverMileageData}
            driverMileageData={driverMileageData}
            isEditable={hasDispatcher}
            styles={prepareStyles(index)}
          />
        ))}
      </div>
    </div>
  );
};
