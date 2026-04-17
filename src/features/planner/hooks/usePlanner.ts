import { useContext, useEffect, useState } from "react";
import { EMPTY_ARRAY } from "#/constants/common/global-constants";
import { DEFAULT_LOCALE } from "#/constants/date/date-constants";
import { getWeekWithDayAndMonth } from "#/utils/planner/planner-utils";
import type { DispatchingRelation } from "#/types/internal/planner/planner-types";
import { getCurrentWeekDays } from "#/utils/global/date-utils";
import { getSchedulableDataByCompanyUuidAndStartAndEndDate } from "#/features/planner/api/planner.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import { fromGetDriverLoadsResponsesToDispatcherLoadDataList } from "#/features/planner/utils/loads.transformer";

export function usePlanner(companyId: string) {
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekDays());
  const [dispatchingRelations, setDispatchingRelations] =
    useState<DispatchingRelation[]>(EMPTY_ARRAY);

  const days = getWeekWithDayAndMonth(activeWeek);

  const extractWeekFromCalendar = (dates: Date[]) => {
    const vals = dates.map((date) => date.toLocaleDateString(DEFAULT_LOCALE));
    setActiveWeek(vals);
  };

  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSchedulableDataByCompanyUuidAndStartAndEndDate(
        companyId,
        activeWeek,
      );

      if (!response.ok) {
        showToast(response.error.message);
        return;
      }

      const responses = response.data ?? EMPTY_ARRAY;

      const startDate = activeWeek[0];
      const endDate = activeWeek[activeWeek.length - 1];

      const relations = fromGetDriverLoadsResponsesToDispatcherLoadDataList(
        responses,
        startDate,
        endDate,
      );

      setDispatchingRelations(relations);
    };

    fetchData().then(() => {});
  }, [companyId, activeWeek, showToast]);

  return {
    days,
    dispatchingRelations,
    setDispatchingRelations,
    extractWeekFromCalendar,
  };
}
