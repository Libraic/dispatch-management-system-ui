import { DailyMileage } from "./DailyMileage.tsx";
import type {
  DriverWeeklyMileage,
  Mileage,
} from "../../../types/financial/trucks-board.ts";
import * as React from "react";

export const DailyMileages: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  setDriverWeeklyMileage: (
    mileageIndex: number,
    field: keyof Mileage,
    value: string,
  ) => void;
}> = ({ driverWeeklyMileage, setDriverWeeklyMileage }) => {
  return (
    <>
      {driverWeeklyMileage.mileages.map((mileage, index) => (
        <div
          className="flex items-center bg-[#f5f7fc] border-[#e6ebfa]"
          key={index}
        >
          <DailyMileage
            mileage={mileage}
            setDriverWeeklyMileage={setDriverWeeklyMileage}
            index={index}
          />
        </div>
      ))}
    </>
  );
};
