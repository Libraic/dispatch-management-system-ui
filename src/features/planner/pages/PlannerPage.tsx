import { PlannerHeader } from "#/features/planner/components/public/PlannerHeader/PlannerHeader";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { PLANNER_HEADER } from "#/constants/common/header-constants";
import { useParams } from "react-router-dom";
import { PlannerRow } from "#/features/planner/components/public/PlannerRow";
import { PlannerMenu } from "#/features/planner/components/public/PlannerMenu/PlannerMenu";
import { PLANNER_VERTICAL_MARGIN } from "#/constants/planner/planner-constants";
import { TimelineCursor } from "#/features/planner/components/internal/TimelineCursor";
import { usePlanner } from "#/features/planner/hooks/usePlanner";
import React from "react";

export const PlannerPage = () => {
  const companyId = useParams().companyUuid!;
  const {
    days,
    timezone,
    dispatchingRelations,
    setDispatchingRelations,
    extractWeekFromCalendar,
  } = usePlanner(companyId);

  return (
    <React.Fragment>
      <PageHeader headerInfo={PLANNER_HEADER} />
      <div className={`flex flex-col mx-[3rem] ${PLANNER_VERTICAL_MARGIN}`}>
        <PlannerMenu
          extractWeekFromCalendar={extractWeekFromCalendar}
          timezone={timezone.value}
        />
        <div className="relative max-h-[80vh] hide-scrollbar overflow-y-auto">
          <div className="relative flex flex-col min-h-full">
            <TimelineCursor days={days} timeZone={timezone.value} />

            <PlannerHeader days={days} />

            {dispatchingRelations.map((dispatchingRelation) => (
              <PlannerRow
                key={dispatchingRelation.id}
                timezone={timezone.value}
                days={days}
                dispatchingRelation={dispatchingRelation}
                setDispatchingRelation={setDispatchingRelations}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
