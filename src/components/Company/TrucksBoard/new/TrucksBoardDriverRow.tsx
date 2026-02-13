import React from "react";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { DriverCalendarCell } from "./DriverCalendarCell.tsx";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";

export const TrucksBoardDriverRow: React.FC<{
  days: string[];
  driverMileageData: DriverMileageData;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  hasDispatcher: boolean;
}> = ({ days, driverMileageData, upsertDriverMileageData, hasDispatcher }) => {
  const gridCols = hasDispatcher
    ? "grid-cols-[15rem_15rem_9rem_17.04rem_repeat(14,5rem)]"
    : "grid-cols-[15rem_15.05rem_9rem_17.05rem_repeat(14,5rem)]";
  return (
    <div className="flex flex-row">
      <div
        className={`grid ${gridCols} items-center h-[4rem] bg-gray-50 ${hasDispatcher && "border-l-1"} border-b-1 border-gray-400 w-[55%] flex-shrink-0`}
      >
        <div
          className={`h-full w-[15rem] ${hasDispatcher && " border-r-1 border-b-1 border-gray-400"} bg-white`}
        ></div>
        <div
          className={`flex items-center px-10 ${SYSTEM_FONT_LIGHT} text-[0.95rem] h-full border-r-1 border-b-1 ${!hasDispatcher && "border-l-1"} border-gray-400`}
        >
          {driverMileageData.driver && driverMileageData.driver.renderOnForm()}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full w-[9rem] border-r-1 border-gray-400`}
        >
          {driverMileageData.totalRevenue}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full w-[17.05rem] border-gray-400`}
        >
          {driverMileageData.totalMiles}
        </div>
        {Array.from({ length: 14 }).map((_, index) => (
          <DriverCalendarCell
            key={index}
            day={days[index]}
            upsertDriverMileageData={upsertDriverMileageData}
            driverMileageData={driverMileageData}
            isEditable={hasDispatcher}
          />
        ))}
      </div>
    </div>
  );
};
