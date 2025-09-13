import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import { setDriver } from "../../../utils/trucks-board/trucks-board-utils.ts";
import {
  DRIVER_KEY,
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
import {
  TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS,
  Z_INDEX_TRUCKS_BOARD_TABLE,
} from "../../../utils/trucks-board/trucks-board-constants.ts";

export const DriverMileageMetadata: React.FC<{
  groupIdentifier: string;
  driverWeeklyMileage: DriverWeeklyMileage;
  driverWeeklyMileageData: DriverWeeklyMileageData;
  index: number;
}> = ({
  groupIdentifier,
  driverWeeklyMileage,
  driverWeeklyMileageData,
  index,
}) => {
  const itemIdentifier = driverWeeklyMileage.itemIdentifier;
  const driverMileageError =
    driverWeeklyMileageData.errors[driverWeeklyMileage.itemIdentifier];
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
      <div
        style={{
          left: offsets[1],
          zIndex: Z_INDEX_TRUCKS_BOARD_TABLE - 1 - index,
          position: "sticky",
        }}
      >
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
          errorMessage={
            driverMileageError && (driverMileageError[DRIVER_KEY] as string)
          }
        />
      </div>
      <div
        style={{
          left: offsets[2],
          zIndex: Z_INDEX_TRUCKS_BOARD_TABLE - 1 - index,
          position: "sticky",
        }}
      >
        <ViewableCell
          data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
        />
      </div>
      <div
        style={{
          left: offsets[3],
          zIndex: Z_INDEX_TRUCKS_BOARD_TABLE - 1 - index,
          position: "sticky",
        }}
      >
        <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileageData} />
      </div>
    </>
  );
};
