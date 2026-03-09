import React from "react";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { DriverCalendarCell } from "./DriverCalendarCell.tsx";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import clsx from "clsx";
import {
  TRUCKS_BOARD_GRID_LAYOUT,
  TRUCKS_BOARD_ROW_HEIGHT,
  TRUCKS_BOARD_TEXT_SIZE,
} from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { DriverRowMetadata } from "./DriverRowMetadata.tsx";

export const TrucksBoardDriverRow: React.FC<{
  days: string[];
  driverMileageData: DriverMileageData;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  hasDispatcher: boolean;
  postDeleteUpdateFn: (
    driver: Driver,
    mileageData: MileageData[],
    driverMileageUuid?: string,
  ) => void;
}> = ({
  days,
  driverMileageData,
  upsertDriverMileageData,
  hasDispatcher,
  postDeleteUpdateFn,
}) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <div
          className={clsx(`
          grid ${TRUCKS_BOARD_GRID_LAYOUT} items-center ${TRUCKS_BOARD_ROW_HEIGHT} bg-gray-50 
          border-b-1 ${TABLE_BORDER_BASE_COLOR}
          flex-shrink-0 ${TRUCKS_BOARD_TEXT_SIZE}
        `)}
        >
          <DriverRowMetadata driverMileageData={driverMileageData} />
          {Array.from({ length: 14 }).map((_, index) => (
            <DriverCalendarCell
              key={index}
              day={days[index]}
              upsertDriverMileageData={upsertDriverMileageData}
              driverMileageData={driverMileageData}
              isEditable={hasDispatcher}
              postDeleteUpdateFn={postDeleteUpdateFn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
