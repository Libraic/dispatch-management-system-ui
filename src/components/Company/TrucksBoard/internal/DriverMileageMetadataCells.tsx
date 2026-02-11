import { LiveSearchCell } from "../../../Common/Matrix/Cell/LiveSearchCell.tsx";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { setDriver } from "../../../../utils/trucks-board/trucks-board-old-utils.ts";
import {
  DRIVER_KEY,
  type DriverMileageErrors,
  type DriverWeeklyMileage,
} from "../../../../types/internal/trucks-board/trucks-board-old-types.ts";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import { joinByCompanyId } from "../../../../utils/api/api-query-utils.ts";
import { ViewableCell } from "../../../Common/Matrix/Cell/ViewableCell.tsx";
import {
  BLANK_STRING,
  REM_UNIT,
  TRAILING_ZERO,
  UNDERSCORE,
} from "../../../../constants/common/global-constants.ts";
import { DriverMileageRevenueAndMilesTotals } from "./DriverMileageRevenueAndMilesTotals.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import type { DriverWeeklyMileageData } from "../../../../hooks/useDriverWeeklyMileage.ts";
import { TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS } from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { getStickyCellStyles } from "../../../../utils/trucks-board/trucks-board-styles-utils.ts";
import { Entity } from "../../../../types/api/common/api-query-types.ts";

export const DriverMileageMetadataCells: React.FC<{
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
    const offsets = [TRAILING_ZERO];
    let offset = 0;
    for (let i = 0; i < widths.length - 1; i++) {
      const width = widths[i];
      offset += parseFloat(width);
      offsets.push(`${offset}${REM_UNIT}`);
    }
    setOffsets(offsets);
  }, []);

  return (
    <>
      <div style={getStickyCellStyles(offsets[1], index)}>
        <LiveSearchCell
          entityType={Entity.DRIVER}
          constructor={Driver}
          object={driverWeeklyMileage.driver}
          joinableEntityId={driverWeeklyMileageData.getCompanyUuid()}
          joinableEntityName={"company"}
          saveObject={(driver: Renderable) =>
            setDriver(
              driverWeeklyMileageData.setDriversMileageGroups,
              driver,
              groupIdentifier,
              itemIdentifier,
            )
          }
          customSearchCriteria={[
            joinByCompanyId(driverWeeklyMileageData.getCompanyUuid()),
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
        <DriverMileageRevenueAndMilesTotals
          mileages={driverWeeklyMileage.mileageData}
        />
      </div>
    </>
  );
};
