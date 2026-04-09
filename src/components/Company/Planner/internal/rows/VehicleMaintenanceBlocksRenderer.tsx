import { VehicleMaintenanceBlock } from "../blocks/VehicleMaintenanceBlock.tsx";
import React from "react";
import type { DriverWorkforce } from "../../../../../types/internal/planner/planner-types.ts";

export const VehicleMaintenanceBlocksRenderer: React.FC<{
  workforce: DriverWorkforce;
}> = ({ workforce }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
