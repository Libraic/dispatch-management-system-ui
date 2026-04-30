import { useActivator } from "#/hooks/useActivator";
import React from "react";
import type { DispatchingRelation } from "#/types/internal/planner/planner-types";
import { BLANK_SPACE } from "#/constants/common/global-constants";
import { DispatcherRow } from "#/features/planner/components/internal/rows/DispatcherRow";
import { PlannerWorkforceRow } from "#/features/planner/components/internal/rows/PlannerWorkforceRow";
import { generateUuid } from "#/utils/global/general-utils";
import { DispatchingContext } from "#/context/DispatchingContext";
import type { DispatchingContextData } from "#/context/DispatchingContextData";
import { useDispatchingRelationActions } from "#/features/planner/hooks/useDispatchingRelationActions";

type PlannerRowProps = {
  days: string[];
  timezone: string;
  dispatchingRelation: DispatchingRelation;
  setDispatchingRelation: React.Dispatch<
    React.SetStateAction<DispatchingRelation[]>
  >;
};

export const PlannerRow: React.FC<PlannerRowProps> = ({
  days,
  dispatchingRelation,
  setDispatchingRelation,
  timezone,
}) => {
  const updatedDays = days.map((day) => day.split(BLANK_SPACE)[1]);
  const activator = useActivator(true);
  const dispatchingRelationId = dispatchingRelation.id;

  const {
    upsertLoadFn,
    upsertVehicleMaintenanceRecordFn,
    upsertDaysOffPeriodFn,
    postLoadDeleteUpdateFn,
    postVehicleMaintenanceRecordDeleteUpdateFn,
    postDaysOffPeriodDeleteUpdateFn,
  } = useDispatchingRelationActions(
    dispatchingRelationId,
    setDispatchingRelation,
  );

  const dispatchingContextData: DispatchingContextData = {
    days: updatedDays,
    timezone,
    upsertLoadFn,
    upsertVehicleMaintenanceRecordFn,
    upsertDaysOffPeriodFn,
    postLoadDeleteUpdateFn,
    postVehicleMaintenanceRecordDeleteUpdateFn,
    postDaysOffPeriodDeleteUpdateFn,
  };

  return (
    <div>
      <DispatcherRow
        dispatchingRelation={dispatchingRelation}
        expander={activator}
      />
      <DispatchingContext value={dispatchingContextData}>
        {activator.isActive() &&
          dispatchingRelation.workforceUnits.map((workforce) => (
            <div key={workforce.relationId ?? generateUuid()}>
              <PlannerWorkforceRow workforce={workforce} />
            </div>
          ))}
      </DispatchingContext>
    </div>
  );
};
