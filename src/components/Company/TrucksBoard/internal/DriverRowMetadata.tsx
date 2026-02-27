import clsx from "clsx";
import {
  TABLE_BORDER_BASE_COLOR,
  TABLE_DELIMITER_BOTTOM_COLOR,
  TABLE_DELIMITER_LEFT_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import {
  TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER,
  TABLE_DELIMITER_THICKNESS_LEFT_BORDER,
  TABLE_NORMAL_THICKNESS_BOTTOM_BORDER,
  TABLE_NORMAL_THICKNESS_LEFT_BORDER,
  TABLE_NORMAL_THICKNESS_RIGHT_BORDER,
} from "../../../../tailwind/tailwind-border-vars.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import React from "react";
import type { DriverMileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";

export const DriverRowMetadata: React.FC<{
  driverMileageData: DriverMileageData;
  hasDispatcher: boolean;
  isLastDriverForDispatcher: boolean;
}> = ({ driverMileageData, hasDispatcher, isLastDriverForDispatcher }) => {
  const bottom = isLastDriverForDispatcher
    ? `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}`
    : BLANK_STRING;

  return (
    <React.Fragment>
      <div
        className={clsx(`
            h-full 
            ${TABLE_DELIMITER_LEFT_COLOR} ${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} 
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
          divide(driverMileageData.totalRevenue, driverMileageData.totalMiles),
        )}
      </div>
    </React.Fragment>
  );
};
