import React, { useContext } from "react";
import type { DriverWorkforce } from "../../../../types/internal/planner/planner-types.ts";
import { PlannerCalendarCell } from "./PlannerCalendarCell.tsx";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import clsx from "clsx";
import {
  PLANNER_GRID_LAYOUT,
  PLANNER_ROW_HEIGHT,
  PLANNER_TEXT_SIZE,
} from "../../../../constants/planner/planner-constants.ts";
import { DriverRowMetadata } from "./DriverRowMetadata.tsx";
import { LoadBlock } from "./LoadBlock.tsx";
import { VehicleMaintenanceBlock } from "./VehicleMaintenanceBlock.tsx";
import { DaysOffPeriodBlock } from "./DaysOffPeriodBlock.tsx";
import { PlanningContext } from "../../../../context/PlanningContext.ts";

export const PlannerDriverRow: React.FC<{
  driverPlanningData: DriverWorkforce;
}> = ({ driverPlanningData }) => {
  const context = useContext(PlanningContext);
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
          <DriverRowMetadata driverLoadData={driverPlanningData} />
          {Array.from({ length: 14 }).map((_, index) => (
            <PlannerCalendarCell
              key={index}
              day={days[index]}
              formProps={{
                day: days[index],
                workforce: driverPlanningData,
              }}
            />
          ))}
        </div>
        {driverPlanningData.loads.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {driverPlanningData.loads.map((load) => (
              <LoadBlock
                key={load.id}
                driverLoadData={driverPlanningData}
                load={load}
              />
            ))}
          </div>
        )}
        {driverPlanningData.vehicleMaintenanceRecords.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {driverPlanningData.vehicleMaintenanceRecords.map(
              (vehicleMaintenanceRecord) => (
                <VehicleMaintenanceBlock
                  key={vehicleMaintenanceRecord.id}
                  workforce={driverPlanningData}
                  vehicleMaintenanceData={vehicleMaintenanceRecord}
                />
              ),
            )}
          </div>
        )}
        {driverPlanningData.daysOffPeriods.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {driverPlanningData.daysOffPeriods.map((daysOffPeriod) => (
              <DaysOffPeriodBlock
                key={daysOffPeriod.id}
                workforce={driverPlanningData}
                daysOffPeriodData={daysOffPeriod}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
