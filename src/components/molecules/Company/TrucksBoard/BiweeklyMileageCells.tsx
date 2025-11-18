import { DailyMileageCells } from "./DailyMileageCells.tsx";
import type {
  DriverMileageErrors,
  DriverWeeklyMileage,
  Mileage,
  MileageError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import * as React from "react";

export const BiweeklyMileageCells: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  setDriverWeeklyMileage: (
    mileageIndex: number,
    field: keyof Mileage,
    value: string,
  ) => void;
  error?: DriverMileageErrors;
}> = ({ driverWeeklyMileage, setDriverWeeklyMileage, error }) => {
  return (
    <>
      {driverWeeklyMileage.mileageData.map((mileage, index) => (
        <div className="flex items-center bg-[#f5f7fc]" key={index}>
          <DailyMileageCells
            mileage={mileage}
            setDriverWeeklyMileage={setDriverWeeklyMileage}
            index={index}
            error={error && (error[mileage.date] as MileageError)}
          />
        </div>
      ))}
    </>
  );
};
