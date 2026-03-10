import { PlannerHeader } from "../../Company/Planner/public/PlannerHeader.tsx";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { PLANNER_HEADER } from "../../../constants/common/header-constants.ts";
import { getCurrentWeekDays } from "../../../utils/global/date-utils.ts";
import { useParams } from "react-router-dom";
import { PlannerRowContainer } from "../../Company/Planner/public/PlannerRowContainer.tsx";
import { useEffect, useState } from "react";
import type { DispatcherLoadData } from "../../../types/internal/planner/planner-types.ts";
import { EMPTY_ARRAY } from "../../../constants/common/global-constants.ts";
import { PlannerMenu } from "../../Company/Planner/public/PlannerMenu.tsx";
import { getLoadsByCompanyUuidAndStartAndEndDate } from "../../../service/loadsService.ts";
import { convertGetDriverLoadsResponsesToDispatcherLoadDataList } from "../../../utils/api/planner/planner-api-utils.ts";
import { DEFAULT_LOCALE } from "../../../constants/date/date-constants.ts";
import { PLANNER_VERTICAL_MARGIN } from "../../../constants/planner/planner-constants.ts";
import { getWeekWithDayAndMonth } from "../../../utils/planner/planner-utils.ts";
import { SidebarWrapper } from "../../SidebarWrapper.tsx";

export const PlannerPage = () => {
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekDays());
  const days = getWeekWithDayAndMonth(activeWeek);
  const companyId = useParams().companyUuid!!;
  const [dispatcherLoads, setDispatcherLoads] =
    useState<DispatcherLoadData[]>(EMPTY_ARRAY);

  const extractWeekFromCalendar = (dates: Date[]) => {
    const vals = dates.map((date) => date.toLocaleDateString(DEFAULT_LOCALE));
    setActiveWeek(vals);
  };

  useEffect(() => {
    getLoadsByCompanyUuidAndStartAndEndDate(companyId, activeWeek).then(
      (data) => {
        const getDriverLoadsResponses = data.data ?? EMPTY_ARRAY;
        const startDate = activeWeek[0];
        const endDate = activeWeek[activeWeek.length - 1];
        const dispatcherLoads =
          convertGetDriverLoadsResponsesToDispatcherLoadDataList(
            getDriverLoadsResponses,
            startDate,
            endDate,
          );
        setDispatcherLoads(dispatcherLoads);
      },
    );
  }, [companyId, activeWeek]);

  return (
    <SidebarWrapper>
      <PageHeader headerInfo={PLANNER_HEADER} />
      <div className={`flex flex-col mx-[3rem] ${PLANNER_VERTICAL_MARGIN}`}>
        <PlannerMenu extractWeekFromCalendar={extractWeekFromCalendar} />
        <div className="flex flex-col max-h-[70vh] hide-scrollbar overflow-y-auto">
          <PlannerHeader days={days} />
          {dispatcherLoads.map((dispatcherLoadData) => (
            <PlannerRowContainer
              key={dispatcherLoadData.identifier}
              companyId={companyId}
              days={days}
              dispatcherLoadData={dispatcherLoadData}
              setDispatcherLoadData={setDispatcherLoads}
            />
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
};
