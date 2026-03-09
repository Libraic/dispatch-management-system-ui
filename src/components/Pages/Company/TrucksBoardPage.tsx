import { TrucksBoardHeader } from "../../Company/TrucksBoard/public/TrucksBoardHeader.tsx";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { TRUCKS_BOARD_HEADER } from "../../../constants/common/header-constants.ts";
import { getCurrentWeekDays } from "../../../utils/global/date-utils.ts";
import { useParams } from "react-router-dom";
import { TrucksBoardRowContainer } from "../../Company/TrucksBoard/public/TrucksBoardRowContainer.tsx";
import { useEffect, useState } from "react";
import type { DispatcherMileageData } from "../../../types/internal/trucks-board/trucks-board-types.ts";
import { EMPTY_ARRAY } from "../../../constants/common/global-constants.ts";
import { TrucksBoardMenu } from "../../Company/TrucksBoard/public/TrucksBoardMenu.tsx";
import { getDriversMileageByCompanyUuidAndStartAndEndDate } from "../../../service/driverMileageService.ts";
import { convertGetDriverMileageResponseListToDispatcherMileageDataList } from "../../../utils/api/trucks-board/trucks-board-api-utils.ts";
import { DEFAULT_LOCALE } from "../../../constants/date/date-constants.ts";
import { TRUCKS_BOARD_VERTICAL_MARGIN } from "../../../constants/trucks-board/trucks-board-constants.ts";
import { getWeekWithDayAndMonth } from "../../../utils/trucks-board/trucks-board-utils.ts";
import { SidebarWrapper } from "../../SidebarWrapper.tsx";

export const TrucksBoardPage = () => {
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekDays());
  const days = getWeekWithDayAndMonth(activeWeek);
  const companyId = useParams().companyUuid!!;
  const [dispatcherMileageDataList, setDispatcherMileageDataList] =
    useState<DispatcherMileageData[]>(EMPTY_ARRAY);

  const extractWeekFromCalendar = (dates: Date[]) => {
    const vals = dates.map((date) => date.toLocaleDateString(DEFAULT_LOCALE));
    setActiveWeek(vals);
  };

  useEffect(() => {
    getDriversMileageByCompanyUuidAndStartAndEndDate(
      companyId,
      activeWeek,
    ).then((data) => {
      const getDriverMileageResponseList = data.data ?? EMPTY_ARRAY;
      const startDate = activeWeek[0];
      const endDate = activeWeek[activeWeek.length - 1];
      const _dispatcherMileageDataList =
        convertGetDriverMileageResponseListToDispatcherMileageDataList(
          getDriverMileageResponseList,
          startDate,
          endDate,
        );
      setDispatcherMileageDataList(_dispatcherMileageDataList);
    });
  }, [companyId, activeWeek]);

  return (
    <SidebarWrapper>
      <PageHeader headerInfo={TRUCKS_BOARD_HEADER} />
      <div
        className={`flex flex-col mx-[3rem] ${TRUCKS_BOARD_VERTICAL_MARGIN}`}
      >
        <TrucksBoardMenu extractWeekFromCalendar={extractWeekFromCalendar} />
        <div className="flex flex-col max-h-[70vh] hide-scrollbar overflow-y-auto">
          <TrucksBoardHeader days={days} />
          {dispatcherMileageDataList.map((dispatcherMileageData) => (
            <TrucksBoardRowContainer
              key={dispatcherMileageData.identifier}
              companyId={companyId}
              days={days}
              dispatcherMileageData={dispatcherMileageData}
              setDispatcherMileageData={setDispatcherMileageDataList}
            />
          ))}
        </div>
      </div>
    </SidebarWrapper>
  );
};
