import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../Common/Page/PageHeader.tsx";
import { useDriverWeeklyMileage } from "../../../hooks/useDriverWeeklyMileage.ts";
import { TrucksBoardMenuBar } from "../../Company/TrucksBoard/public/TrucksBoardMenuBar.tsx";
import { useEffect, useState } from "react";
import { saveDriversWeeklyMileage } from "../../../utils/api/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { ToastRenderer } from "../../Common/Toast/ToastRenderer.tsx";
import { BackButton } from "../../Common/Button/BackButton.tsx";
import { formatCompanyDashboardRoute } from "../../../utils/route/route-utils.ts";
import { ConfirmationModal } from "../../Common/Modal/ConfirmationModal.tsx";
import { getCurrentWeekDays } from "../../../utils/date/date-utils.ts";
import { fetchDriversMileageByCompanyUuidAndStartAndEndDate } from "../../../service/driverMileageService.ts";
import { TRUCKS_BOARD_HEADER } from "../../../constants/common/header-constants.ts";
import { TrucksBoardMatrix } from "../../Company/TrucksBoard/public/TrucksBoardMatrix.tsx";
import { DEFAULT_DATE_LOCALE } from "../../../constants/date/date-constants.ts";

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
    const vals = dates.map((date) =>
      date.toLocaleDateString(DEFAULT_DATE_LOCALE),
    );
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
          <TrucksBoardMenuBar
            driverWeeklyMileageData={driverWeeklyMileageData}
            toast={toastData}
            extractWeekFromCalendar={extractWeekFromCalendar}
          />
        </div>
        <TrucksBoardMatrix
          driverWeeklyMileageData={driverWeeklyMileageData}
          activeWeek={activeWeek}
        />
        <ToastRenderer toast={toastData} />
      </div>
    </div>
  );
};
