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
import { LoadBlock } from "../blocks/LoadBlock.tsx";
import { VehicleMaintenanceBlock } from "../blocks/VehicleMaintenanceBlock.tsx";
import { DaysOffPeriodBlock } from "../blocks/DaysOffPeriodBlock.tsx";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";

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
        {workforce.loads.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {workforce.loads.map((load) => (
              <LoadBlock key={load.id} driverLoadData={workforce} load={load} />
            ))}
          </div>
        )}
        {workforce.vehicleMaintenanceRecords.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {workforce.vehicleMaintenanceRecords.map(
              (vehicleMaintenanceRecord) => (
                <VehicleMaintenanceBlock
                  key={vehicleMaintenanceRecord.id}
                  workforce={workforce}
                  vehicleMaintenanceData={vehicleMaintenanceRecord}
                />
              ),
            )}
          </div>
        )}
        {workforce.daysOffPeriods.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {workforce.daysOffPeriods.map((daysOffPeriod) => (
              <DaysOffPeriodBlock
                key={daysOffPeriod.id}
                workforce={workforce}
                daysOffPeriodData={daysOffPeriod}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
