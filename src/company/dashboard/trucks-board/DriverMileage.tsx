import { setDriverWeeklyMileage } from "../../../utils/trucks-board/trucks-board-utils.ts";
import { DailyMileageView } from "./DailyMileageView.tsx";
import {
  type DriverWeeklyMileage,
  type Mileage,
} from "../../../types/financial/trucks-board.ts";
import * as React from "react";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/trucks-board/trucks-board-constants.ts";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { DriverMileageMetadata } from "./DriverMileageMetadata.tsx";
import { CheckBox } from "../../../global/CheckBox.tsx";

export const DriverMileage: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileage, driverWeeklyMileageData }) => {
  const itemIdentifier = driverWeeklyMileage.itemIdentifier;
  const driverMileageError =
    driverWeeklyMileageData.errors[driverWeeklyMileage.itemIdentifier];
  return (
    <div
      className={`min-w-[1000px] min-h-[6rem] ${TRUCKS_BOARD_COLUMNS_LAYOUT} grid rounded-[0.3rem] font-open-sans font-light bg-white`}
    >
      <div className="sticky left-0 bg-white z-10">
        <CheckBox
          isChecked={driverWeeklyMileageData
            .getIdentifiersMarkedForDeletion()
            .includes(itemIdentifier)}
          onChange={(e) => {
            if (e.target.checked) {
              driverWeeklyMileageData.markForDeletion(itemIdentifier);
            } else {
              driverWeeklyMileageData.unmarkForDeletion(itemIdentifier);
            }
          }}
        />
      </div>
      <DriverMileageMetadata
        driverWeeklyMileage={driverWeeklyMileage}
        driverWeeklyMileageData={driverWeeklyMileageData}
      />
      <DailyMileageView
        driverWeeklyMileage={driverWeeklyMileage}
        setDriverWeeklyMileage={(
          mileageIndex: number,
          field: keyof Mileage,
          value: string,
        ) =>
          setDriverWeeklyMileage(
            driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
            itemIdentifier,
            mileageIndex,
            field,
            value,
          )
        }
        error={driverMileageError}
      />
    </div>
  );
};
