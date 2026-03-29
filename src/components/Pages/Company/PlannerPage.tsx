import { PlannerHeader } from "../../Company/Planner/public/PlannerHeader.tsx";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { PLANNER_HEADER } from "../../../constants/common/header-constants.ts";
import { getCurrentWeekDays } from "../../../utils/global/date-utils.ts";
import { useParams } from "react-router-dom";
import { PlannerRow } from "../../Company/Planner/public/PlannerRow.tsx";
import { useEffect, useState } from "react";
import type { DispatchingRelation } from "../../../types/internal/planner/planner-types.ts";
import { EMPTY_ARRAY } from "../../../constants/common/global-constants.ts";
import { PlannerMenu } from "../../Company/Planner/public/PlannerMenu.tsx";
import { convertGetDriverLoadsResponsesToDispatcherLoadDataList } from "../../../utils/api/planner/planner-api-utils.ts";
import { DEFAULT_LOCALE } from "../../../constants/date/date-constants.ts";
import { PLANNER_VERTICAL_MARGIN } from "../../../constants/planner/planner-constants.ts";
import { getWeekWithDayAndMonth } from "../../../utils/planner/planner-utils.ts";
import { SidebarWrapper } from "../../SidebarWrapper.tsx";
import { getSchedulableDataByCompanyUuidAndStartAndEndDate } from "../../../service/plannerService.ts";
import { TimelineCursor } from "../../Company/Planner/internal/TimelineCursor.tsx";

export const PlannerPage = () => {
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekDays());
  const days = getWeekWithDayAndMonth(activeWeek);
  const companyId = useParams().companyUuid!!;
  const [dispatchingRelations, setDispatchingRelations] =
    useState<DispatchingRelation[]>(EMPTY_ARRAY);

  const extractWeekFromCalendar = (dates: Date[]) => {
    const vals = dates.map((date) => date.toLocaleDateString(DEFAULT_LOCALE));
    setActiveWeek(vals);
  };

  useEffect(() => {
    getSchedulableDataByCompanyUuidAndStartAndEndDate(
      companyId,
      activeWeek,
    ).then((data) => {
      const getDriverLoadsResponses = data.data ?? EMPTY_ARRAY;
      const startDate = activeWeek[0];
      const endDate = activeWeek[activeWeek.length - 1];
      const dispatchingRelations =
        convertGetDriverLoadsResponsesToDispatcherLoadDataList(
          getDriverLoadsResponses,
          startDate,
          endDate,
        );
      setDispatchingRelations(dispatchingRelations);
    });
  }, [companyId, activeWeek]);
  return (
    <SidebarWrapper>
      <PageHeader headerInfo={PLANNER_HEADER} />
      <div className={`flex flex-col mx-[3rem] ${PLANNER_VERTICAL_MARGIN}`}>
        <PlannerMenu extractWeekFromCalendar={extractWeekFromCalendar} />
        <div className="relative flex flex-col max-h-[70vh] hide-scrollbar overflow-y-auto">
          <TimelineCursor days={days}/>
          <PlannerHeader days={days} />
          {dispatchingRelations.map((dispatchingRelation) => (
            <PlannerRow
              key={dispatchingRelation.id}
              companyId={companyId}
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
