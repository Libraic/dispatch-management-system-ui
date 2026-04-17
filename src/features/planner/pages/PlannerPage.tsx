import { PlannerHeader } from "#/features/planner/components/public/PlannerHeader/PlannerHeader";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { PLANNER_HEADER } from "#/constants/common/header-constants";
import { useParams } from "react-router-dom";
import { PlannerRow } from "#/features/planner/components/public/PlannerRow";
import { PlannerMenu } from "#/features/planner/components/public/PlannerMenu";
import { PLANNER_VERTICAL_MARGIN } from "#/constants/planner/planner-constants";
import { SidebarWrapper } from "#/components/SidebarWrapper";
import { TimelineCursor } from "#/features/planner/components/internal/TimelineCursor";
import { usePlanner } from "#/features/planner/hooks/usePlanner";

export const PlannerPage = () => {
  const companyId = useParams().companyUuid!;
  const {
    days,
    dispatchingRelations,
    setDispatchingRelations,
    extractWeekFromCalendar,
  } = usePlanner(companyId);

  return (
    <SidebarWrapper>
      <PageHeader headerInfo={PLANNER_HEADER} />
      <div className={`flex flex-col mx-[3rem] ${PLANNER_VERTICAL_MARGIN}`}>
        <PlannerMenu extractWeekFromCalendar={extractWeekFromCalendar} />
        <div className="relative flex flex-col max-h-[70vh] hide-scrollbar overflow-y-auto">
          <TimelineCursor days={days} />
          <PlannerHeader days={days} />
          {dispatchingRelations.map((dispatchingRelation) => (
            <PlannerRow
              key={dispatchingRelation.id}
              days={days}
              dispatchingRelation={dispatchingRelation}
              setDispatchingRelation={setDispatchingRelations}
            />
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
};
