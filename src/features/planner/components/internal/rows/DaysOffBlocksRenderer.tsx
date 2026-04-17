import { DaysOffPeriodBlock } from "#/features/planner/components/internal/blocks/DaysOffPeriodBlock";
import React from "react";
import type { DriverWorkforce } from "#/types/internal/planner/planner-types";

export const DaysOffBlocksRenderer: React.FC<{
  workforce: DriverWorkforce;
}> = ({ workforce }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
