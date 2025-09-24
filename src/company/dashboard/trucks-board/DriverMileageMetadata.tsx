import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import { setDriver } from "../../../utils/trucks-board/trucks-board-utils.ts";
import {
  DRIVER_KEY,
  type DriverMileageErrors,
  type DriverWeeklyMileage,
} from "../../../types/financial/trucks-board.ts";
import { Driver } from "../../../types/api/Driver.ts";
import { queryDriversByCompanyId } from "../../../utils/api/query-utils.ts";
import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import {
  BLANK_STRING,
  UNDERSCORE,
} from "../../../utils/constants/global-constants.ts";
import { TotalRevenueAndMiles } from "./TotalRevenueAndMiles.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS } from "../../../utils/trucks-board/trucks-board-constants.ts";
import { getStickyCellStyles } from "../../../utils/trucks-board/trucks-board-styles-utils.ts";

export const DriverMileageMetadata: React.FC<{
  groupIdentifier: string;
  driverWeeklyMileage: DriverWeeklyMileage;
  driverWeeklyMileageData: DriverWeeklyMileageData;
  index: number;
  error?: DriverMileageErrors;
}> = ({
  groupIdentifier,
  driverWeeklyMileage,
  driverWeeklyMileageData,
  index,
  error,
}) => {
  const itemIdentifier = driverWeeklyMileage.itemIdentifier;
  const [offsets, setOffsets] = useState<string[]>([]);

  useEffect(() => {
    const widths = TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.split(UNDERSCORE);
    const offsets = ["0"];
    let offset = 0;
    for (let i = 0; i < widths.length - 1; i++) {
      const width = widths[i];
      offset += parseFloat(width);
      offsets.push(`${offset}rem`);
    }
    setOffsets(offsets);
  }, []);

  return (
    <>
      <div style={getStickyCellStyles(offsets[1], index)}>
        <LiveSearchCell
          defaultSearchKey={LiveSearchKey.DRIVER}
          constructor={Driver}
          object={driverWeeklyMileage.driver}
          saveObject={(driver: Renderable) =>
            setDriver(
              driverWeeklyMileageData.setDriversMileageGroups,
              driver,
              groupIdentifier,
              itemIdentifier,
            )
          }
          customSearchCriteria={[
            queryDriversByCompanyId(driverWeeklyMileageData.getCompanyUuid()),
          ]}
          errorMessage={error && (error[DRIVER_KEY] as string)}
        />
      </div>
      <div style={getStickyCellStyles(offsets[2], index)}>
        <ViewableCell
          data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
        />
      </div>
      <div style={getStickyCellStyles(offsets[3], index)}>
        <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileageData} />
      </div>
    </>
  );
};
