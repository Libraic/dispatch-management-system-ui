import { useNavigate, useParams } from "react-router-dom";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import {
  TRUCKS_BOARD_PRIMARY_COLUMNS,
  TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS,
  TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT,
} from "../../../utils/trucks-board/trucks-board-constants.ts";
import { PageHeader } from "../../../global/PageHeader.tsx";
import { useDriverWeeklyMileage } from "../../../hooks/useDriverWeeklyMileage.ts";
import { OptionBar } from "./OptionBar.tsx";
import { useEffect, useState } from "react";
import { saveDriversWeeklyMileage } from "../../../utils/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../toast/ToastRenderer.tsx";
import { BackButton } from "../../../global/BackButton.tsx";
import { formatCompanyDashboardRoute } from "../../../utils/global/route-utils.ts";
import { ConfirmationModal } from "../../../global/ConfirmationModal.tsx";
import { DriversMileageView } from "./DriversMileageView.tsx";
import { getWeekWithNames } from "../../../utils/global/date.ts";
import { BLANK_SPACE } from "../../../utils/constants/global-constants.ts";
import type { User } from "../../../types/api/User.ts";
import type { DriverWeeklyMileage } from "../../../types/financial/trucks-board.ts";
import { TrucksBoardTimeline } from "./TrucksBoardTimeline.tsx";
import { fetchDriversMileageByCompanyUuidAndStartAndEndDate } from "../../../service/driver-mileage-service.ts";
import { getWeekWithDayAndMonth } from "../../../utils/trucks-board/trucks-board-utils.ts";
import { TRUCKS_BOARD_HEADER } from "../../../utils/constants/headers.ts";

const WEEKS = getWeekWithNames(new Date());

export type DriversMileageGroup = {
  dispatcher: User | null;
  groupIdentifier: string;
  startDate: string;
  endDate: string;
  items: DriverWeeklyMileage[];
};

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const [week, setWeek] = useState<string[]>(WEEKS[0]);
  const driverWeeklyMileageData = useDriverWeeklyMileage(companyUuid!!, week);
  const toastData = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDriversMileageByCompanyUuidAndStartAndEndDate(
      companyUuid!!,
      week,
    ).then((response) => {
      if (Array.isArray(response)) {
        driverWeeklyMileageData.setDriversMileageGroups(response);
      } else {
        toastData.withErrorMessage(response);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

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
        <div className="w-[90%] mx-auto">
          <OptionBar
            driverWeeklyMileageData={driverWeeklyMileageData}
            toast={toastData}
          />
        </div>
        <div className="flex-1 w-[90%] mx-auto overflow-x-auto">
          <MatrixHeader
            stickyColumns={TRUCKS_BOARD_PRIMARY_COLUMNS}
            stickyColumnsLayout={TRUCKS_BOARD_PRIMARY_COLUMNS_WIDTHS.replace(
              /_/g,
              BLANK_SPACE,
            )}
            scrollableColumns={getWeekWithDayAndMonth(week)}
            scrollableColumnsLayout={TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}
          />
          <DriversMileageView
            driverWeeklyMileageData={driverWeeklyMileageData}
          />
        </div>
        <TrucksBoardTimeline weeks={WEEKS} setActiveWeek={setWeek} />
        <ToastRenderer toast={toastData} />
      </div>
    </div>
  );
};
