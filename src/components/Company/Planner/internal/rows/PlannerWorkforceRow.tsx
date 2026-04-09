import React, { useContext } from "react";
import type { DriverWorkforce } from "../../../../../types/internal/planner/planner-types.ts";
import { PlannerCalendarCell } from "../PlannerCalendarCell.tsx";
import { TABLE_BORDER_BASE_COLOR } from "../../../../../tailwind/tailwind-colors-vars.ts";
import clsx from "clsx";
import {
  PLANNER_GRID_LAYOUT,
  PLANNER_ROW_HEIGHT,
  PLANNER_TEXT_SIZE,
} from "../../../../../constants/planner/planner-constants.ts";
import { DriverRowMetadata } from "../DriverRowMetadata.tsx";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { LoadBlocksRenderer } from "./LoadBlocksRenderer.tsx";
import { VehicleMaintenanceBlocksRenderer } from "./VehicleMaintenanceBlocksRenderer.tsx";
import { DaysOffBlocksRenderer } from "./DaysOffBlocksRenderer.tsx";

export const PlannerWorkforceRow: React.FC<{
  workforce: DriverWorkforce;
}> = ({ workforce }) => {
  const context = useContext(DispatchingContext);
  const days = context!!.days;
  return (
    <div className="flex flex-row">
      <div className="relative flex flex-row">
        <div
          className={clsx(`
            grid ${PLANNER_GRID_LAYOUT} items-center ${PLANNER_ROW_HEIGHT} bg-gray-50
            border-b-1 ${TABLE_BORDER_BASE_COLOR}
            flex-shrink-0 ${PLANNER_TEXT_SIZE}
          `)}
        >
          <DriverRowMetadata driverLoadData={workforce} />
          {Array.from({ length: 14 }).map((_, index) => (
            <PlannerCalendarCell
              key={index}
              day={days[index]}
              formProps={{
                day: days[index],
                workforce: workforce,
              }}
            />
          ))}
        </div>
        <LoadBlocksRenderer workforce={workforce} />
        <VehicleMaintenanceBlocksRenderer workforce={workforce} />
        <DaysOffBlocksRenderer workforce={workforce} />
      </div>
    </div>
  );
};
