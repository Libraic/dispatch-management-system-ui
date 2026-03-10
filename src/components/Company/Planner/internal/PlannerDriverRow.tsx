import React from "react";
import { Driver } from "../../../../types/internal/classes/Driver.ts";
import type {
  DriverLoadData,
  LoadData,
} from "../../../../types/internal/planner/planner-types.ts";
import { DriverCalendarCell } from "./DriverCalendarCell.tsx";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import clsx from "clsx";
import {
  PLANNER_GRID_LAYOUT,
  PLANNER_ROW_HEIGHT,
  PLANNER_TEXT_SIZE,
} from "../../../../constants/planner/planner-constants.ts";
import { DriverRowMetadata } from "./DriverRowMetadata.tsx";

export const PlannerDriverRow: React.FC<{
  days: string[];
  driverLoadData: DriverLoadData;
  upsertDriverLoadData: (driver: Driver, loadData: LoadData) => void;
  hasDispatcher: boolean;
  postDeleteUpdateFn: (
    driver: Driver,
    loadDataList: LoadData[],
    loadUuid?: string,
  ) => void;
}> = ({
  days,
  driverLoadData,
  upsertDriverLoadData,
  hasDispatcher,
  postDeleteUpdateFn,
}) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <div
          className={clsx(`
          grid ${PLANNER_GRID_LAYOUT} items-center ${PLANNER_ROW_HEIGHT} bg-gray-50 
          border-b-1 ${TABLE_BORDER_BASE_COLOR}
          flex-shrink-0 ${PLANNER_TEXT_SIZE}
        `)}
        >
          <DriverRowMetadata driverLoadData={driverLoadData} />
          {Array.from({ length: 14 }).map((_, index) => (
            <DriverCalendarCell
              key={index}
              day={days[index]}
              upsertDriverLoadData={upsertDriverLoadData}
              driverLoadData={driverLoadData}
              isEditable={hasDispatcher}
              postDeleteUpdateFn={postDeleteUpdateFn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
