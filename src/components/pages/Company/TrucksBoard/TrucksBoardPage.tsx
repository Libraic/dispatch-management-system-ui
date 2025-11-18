import { useNavigate, useParams } from "react-router-dom";
import { MatrixHeader } from "../../../organisms/Header/MatrixHeader.tsx";
import {
  TRUCKS_BOARD_PRIMARY_COLUMNS,
  TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS,
  TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT,
} from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { PageHeader } from "../../../organisms/Header/PageHeader.tsx";
import { useDriverWeeklyMileage } from "../../../../hooks/useDriverWeeklyMileage.ts";
import { OptionBar } from "../../../organisms/Company/TrucksBoard/OptionBar.tsx";
import { useEffect, useState } from "react";
import { saveDriversWeeklyMileage } from "../../../../utils/api/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../atoms/Toast/ToastRenderer.tsx";
import { BackButton } from "../../../atoms/Button/BackButton.tsx";
import { formatCompanyDashboardRoute } from "../../../../utils/route/route-utils.ts";
import { ConfirmationModal } from "../../../molecules/Modal/ConfirmationModal.tsx";
import { DriversMileage } from "../../../organisms/Company/TrucksBoard/DriversMileage.tsx";
import { getCurrentWeekDays } from "../../../../utils/date/date-utils.ts";
import { BLANK_SPACE } from "../../../../constants/common/global-constants.ts";
import { fetchDriversMileageByCompanyUuidAndStartAndEndDate } from "../../../../service/driverMileageService.ts";
import { getWeekWithDayAndMonth } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { TRUCKS_BOARD_HEADER } from "../../../../constants/common/header-constants.ts";

export const TrucksBoardPage = () => {
  const { companyUuid } = useParams();
  const [activeWeek, setActiveWeek] = useState(getCurrentWeekDays());
  const driverWeeklyMileageData = useDriverWeeklyMileage(
    companyUuid!!,
    activeWeek,
  );
  const toastData = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const extractWeekFromCalendar = (dates: Date[]) => {
    const vals = dates.map((date) => date.toLocaleDateString("en-CA"));
    setActiveWeek(vals);
  };

  useEffect(() => {
    fetchDriversMileageByCompanyUuidAndStartAndEndDate(
      companyUuid!!,
      activeWeek,
    ).then((response) => {
      if (Array.isArray(response)) {
        driverWeeklyMileageData.setDriversMileageGroups(response);
      } else {
        toastData.withErrorMessage(response);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWeek]);

  return (
    <div className="overflow-hidden hide-scrollbar">
      <div className="w-screen h-screen flex flex-col mt-2 text-[0.8rem]">
        <ConfirmationModal
          showModal={showModal}
          positiveAction={async () => {
            const response = await saveDriversWeeklyMileage(
              driverWeeklyMileageData,
            );
            driverWeeklyMileageData.setErrors(response);
            if (Object.keys(response).length !== 0) {
              setShowModal(false);
            } else {
              navigate(formatCompanyDashboardRoute(companyUuid!!));
            }
          }}
          intermediaryAction={() => setShowModal(false)}
          negativeAction={() =>
            navigate(formatCompanyDashboardRoute(companyUuid!!))
          }
        />
        <BackButton
          url={formatCompanyDashboardRoute(companyUuid!!)}
          action={() => setShowModal(true)}
        />
        <PageHeader headerInfo={TRUCKS_BOARD_HEADER} />
        <div className="w-[95%] mx-auto">
          <OptionBar
            driverWeeklyMileageData={driverWeeklyMileageData}
            toast={toastData}
            extractWeekFromCalendar={extractWeekFromCalendar}
          />
        </div>
        <div className="flex-1 w-[95%] mx-auto overflow-x-auto">
          <MatrixHeader
            stickyColumns={TRUCKS_BOARD_PRIMARY_COLUMNS}
            stickyColumnsLayout={TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.replace(
              /_/g,
              BLANK_SPACE,
            )}
            scrollableColumns={getWeekWithDayAndMonth(activeWeek)}
            scrollableColumnsLayout={TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}
          />
          <DriversMileage driverWeeklyMileageData={driverWeeklyMileageData} />
        </div>
        <ToastRenderer toast={toastData} />
      </div>
    </div>
  );
};
