import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import React from "react";
import type { DriverMileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";

export const DriverRowMetadata: React.FC<{
  driverMileageData: DriverMileageData;
}> = ({ driverMileageData }) => {
  return (
    <React.Fragment>
      <div
        className={`flex items-center pl-[4rem] ${SYSTEM_FONT_LIGHT} h-full border-x-1 border-b-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        {driverMileageData.driver && driverMileageData.driver.renderOnForm()}
      </div>
      <div
        className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        {formatCurrency(driverMileageData.totalRevenue)}
      </div>
      <div
        className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        {formatNumber(driverMileageData.totalMiles)}
      </div>
      <div
        className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full ${TABLE_BORDER_BASE_COLOR} border-r-1`}
      >
        {formatNumber(
          divide(driverMileageData.totalRevenue, driverMileageData.totalMiles),
        )}
      </div>
    </React.Fragment>
  );
};
