import { TABLE_BORDER_BASE_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import React from "react";
import type { DriverWorkforce } from "#/types/internal/planner/planner-types";
import {
  formatCurrency,
  formatNumber,
  formatPhoneNumber,
} from "#/shared/utils/inputField.utils";
import { divide } from "#/shared/utils/number.utils";
import { DriverRowCellContainer } from "#/features/planner/components/internal/DriverRowCellContainer";

type DriverRowMetadataProps = {
  driverLoadData: DriverWorkforce;
};

export const DriverRowMetadata: React.FC<DriverRowMetadataProps> = ({
  driverLoadData,
}) => {
  return (
    <React.Fragment>
      <div
        className={`flex flex-col items-center justify-center font-light h-full border-x-1 border-b-1 ${TABLE_BORDER_BASE_COLOR}`}
      >
        <p>{driverLoadData.driver && driverLoadData.driver.fullName}</p>
        <p className="text-gray-500">
          {driverLoadData.driver &&
            formatPhoneNumber(driverLoadData.driver.phoneNumber)}
        </p>
      </div>
      <DriverRowCellContainer
        value={formatCurrency(driverLoadData.totalRevenue)}
      />
      <DriverRowCellContainer
        value={formatNumber(driverLoadData.totalLoadedMiles)}
      />
      <DriverRowCellContainer
        value={formatCurrency(
          divide(driverLoadData.totalRevenue, driverLoadData.totalLoadedMiles),
        )}
      />
    </React.Fragment>
  );
};
