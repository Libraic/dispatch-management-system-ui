import { LoadBlock } from "../blocks/LoadBlock.tsx";
import React from "react";
import type { DriverWorkforce } from "../../../../../types/internal/planner/planner-types.ts";

export const LoadBlocksRenderer: React.FC<{ workforce: DriverWorkforce }> = ({
  workforce,
}) => {
  return (
    <React.Fragment>
      {workforce.loads.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {workforce.loads.map((load) => (
            <LoadBlock key={load.id} driverLoadData={workforce} load={load} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
