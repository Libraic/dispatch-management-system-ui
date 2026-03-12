import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  divide,
  formatCurrency,
  formatNumber,
} from "../../../../utils/global/number-utils.ts";
import React from "react";
import type { DriverLoadData } from "../../../../types/internal/planner/planner-types.ts";
import { formatPhoneNumber } from "../../../../utils/global/input-form-utils.ts";

export const DriverRowMetadata: React.FC<{
  driverLoadData: DriverLoadData;
}> = ({ driverLoadData }) => {
  return (
    <React.Fragment>
      <div
        className={`flex flex-col items-center justify-center pl-[3.5rem] ${SYSTEM_FONT_LIGHT} h-full border-x-1 border-b-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        <p>{driverLoadData.driver && driverLoadData.driver.fullName}</p>
        <p className="text-gray-500">
          {driverLoadData.driver &&
            formatPhoneNumber(driverLoadData.driver.phoneNumber)}
        </p>
      </div>
      <div
        className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        {formatCurrency(driverLoadData.totalRevenue)}
      </div>
      <div
        className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        {formatNumber(driverLoadData.totalMiles)}
      </div>
      <div
        className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full ${TABLE_BORDER_BASE_COLOR} border-r-1`}
      >
        {formatCurrency(
          divide(driverLoadData.totalRevenue, driverLoadData.totalMiles),
        )}
      </div>
    </React.Fragment>
  );
};
