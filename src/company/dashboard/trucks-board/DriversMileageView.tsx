import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { TRUCKS_BOARD_COLUMNS_LAYOUT } from "../../../utils/trucks-board/trucks-board-constants.ts";
import { DriverMileageMetadata } from "./DriverMileageMetadata.tsx";
import { DailyMileageView } from "./DailyMileageView.tsx";
import type { Mileage } from "../../../types/financial/trucks-board.ts";
import { setDriverWeeklyMileage } from "../../../utils/trucks-board/trucks-board-utils.ts";

export const DriversMileageView: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  return (
    <>
      {driverWeeklyMileageData.currentDriversWeeklyMileage.map(
        (driverWeeklyMileage, index) => (
          <div
            style={{ gridTemplateColumns: TRUCKS_BOARD_COLUMNS_LAYOUT }}
            className={`min-w-[1000px] min-h-[6rem] grid rounded-[0.3rem] font-open-sans font-light bg-white`}
          >
            <DriverMileageMetadata
              driverWeeklyMileage={driverWeeklyMileage}
              driverWeeklyMileageData={driverWeeklyMileageData}
              index={index}
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
                  driverWeeklyMileage.itemIdentifier,
                  mileageIndex,
                  field,
                  value,
                )
              }
              error={
                driverWeeklyMileageData.errors[
                  driverWeeklyMileage.itemIdentifier
                ]
              }
            />
          </div>
        ),
      )}
    </>
  );
};
