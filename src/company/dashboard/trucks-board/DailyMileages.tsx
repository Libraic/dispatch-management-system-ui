import { DailyMileage } from "./DailyMileage.tsx";
import type { DriverWeeklyMileage } from "../../../types/financial/trucks-board.ts";
import type { Dispatch, SetStateAction } from "react";
import * as React from "react";

export const DailyMileages: React.FC<{
  driverWeeklyMileage: DriverWeeklyMileage;
  setDriverWeeklyMileage: Dispatch<SetStateAction<DriverWeeklyMileage>>;
}> = ({ driverWeeklyMileage, setDriverWeeklyMileage }) => {
  return (
    <>
      {driverWeeklyMileage.mileages.map((mileage, index) => (
        <div
          className="flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa]"
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
