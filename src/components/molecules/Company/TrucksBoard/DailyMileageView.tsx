import { DailyMileage } from "./DailyMileage.tsx";
import type {
  DriverMileageErrors,
  DriverWeeklyMileage,
  Mileage,
  MileageError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import * as React from "react";

export const DailyMileageView: React.FC<{
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
        <div
          className="flex items-center bg-[#f5f7fc] border-[#e6ebfa]"
          key={index}
        >
          <DailyMileage
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
