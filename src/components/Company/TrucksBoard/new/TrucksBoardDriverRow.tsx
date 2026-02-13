import React from "react";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { DriverCalendarCell } from "./DriverCalendarCell.tsx";
import { SYSTEM_FONT_LIGHT } from "../../../../tailwind/tailwind-font-vars.ts";
import { divide } from "../../../../utils/global/number-utils.ts";

export const TrucksBoardDriverRow: React.FC<{
  days: string[];
  driverMileageData: DriverMileageData;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  hasDispatcher: boolean;
}> = ({ days, driverMileageData, upsertDriverMileageData, hasDispatcher }) => {
  const gridCols = hasDispatcher
    ? "grid-cols-[12rem_12rem_6rem_6rem_5.93rem_repeat(14,5rem)]"
    : "grid-cols-[12rem_12.05rem_6rem_6rem_5.94rem_repeat(14,5rem)]";
  return (
    <div className="flex flex-row">
      <div
        className={`grid ${gridCols} items-center h-[4rem] bg-gray-50 ${hasDispatcher && "border-l-1"} border-b-1 border-gray-400 flex-shrink-0 text-[0.9rem]`}
      >
        <div
          className={`h-full ${hasDispatcher && " border-r-1 border-b-1 border-gray-400"} bg-white`}
        ></div>
        <div
          className={`flex items-center px-10 ${SYSTEM_FONT_LIGHT} h-full border-r-1 border-b-1 ${!hasDispatcher && "border-l-1"} border-gray-400`}
        >
          {driverMileageData.driver && driverMileageData.driver.renderOnForm()}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 border-gray-400`}
        >
          {driverMileageData.totalRevenue}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-r-1 border-gray-400`}
        >
          {driverMileageData.totalMiles}
        </div>
        <div
          className={`flex items-center px-5 ${SYSTEM_FONT_LIGHT} h-full border-gray-400`}
        >
          {divide(driverMileageData.totalRevenue, driverMileageData.totalMiles)}
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
