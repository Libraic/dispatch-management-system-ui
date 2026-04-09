import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import type { DispatchingRelation } from "../../../../types/internal/planner/planner-types.ts";
import { BLANK_SPACE } from "../../../../constants/common/global-constants.ts";
import { DispatcherRow } from "../internal/rows/DispatcherRow.tsx";
import { PlannerWorkforceRow } from "../internal/rows/PlannerWorkforceRow.tsx";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { DispatchingContext } from "../../../../context/DispatchingContext.ts";
import type { DispatchingContextData } from "../../../../context/DispatchingContextData.ts";
import { useDispatchingRelationActions } from "../../../../hooks/useDispatchingRelationActions.ts";

export const PlannerRow: React.FC<{
  days: string[];
  dispatchingRelation: DispatchingRelation;
  setDispatchingRelation: React.Dispatch<
    React.SetStateAction<DispatchingRelation[]>
  >;
}> = ({ days, dispatchingRelation, setDispatchingRelation }) => {
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
