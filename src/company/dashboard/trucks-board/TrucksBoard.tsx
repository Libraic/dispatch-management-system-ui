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
import { fetchDriversMileageByCompanyUuidAndStartAndEndDate } from "../../../service/driver-mileage-service.ts";
import {
  groupDriverWeeklyMileageByDispatcher,
  mapDriverWeeklyMileageResponseToDriverWeeklyMileage,
  saveDriversWeeklyMileage,
} from "../../../utils/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../../utils/global/error-messages.ts";
import { ToastRenderer } from "../../../toast/ToastRenderer.tsx";
import { BackButton } from "../../../global/BackButton.tsx";
import { formatCompanyDashboardRoute } from "../../../utils/global/route-utils.ts";
import { ConfirmationModal } from "../../../global/ConfirmationModal.tsx";
import { DriversMileageView } from "./DriversMileageView.tsx";
import { WeeklyBoardBar } from "./WeeklyBoardBar.tsx";
import { getWeekWithNames } from "../../../utils/global/date.ts";
import {
  BLANK_SPACE,
  DOT,
  HYPHEN,
} from "../../../utils/constants/global-constants.ts";
import type { User } from "../../../types/api/User.ts";
import type { DriverWeeklyMileage } from "../../../types/financial/trucks-board.ts";

const WEEKS = getWeekWithNames(new Date());

export type DriversMileageGroup = {
  dispatcher: User;
  groupIdentifier: string;
  items: DriverWeeklyMileage[];
};

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const [week, setWeek] = useState<string[]>(WEEKS[0]);
  const driverWeeklyMileageData = useDriverWeeklyMileage(companyUuid!!, week);
  const toastData = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [activeBars, setActiveBars] = useState<boolean[]>(
    WEEKS.map((_, i) => i === 0),
  );

  useEffect(() => {
    fetchDriversMileageByCompanyUuidAndStartAndEndDate(companyUuid!!, week)
      .then((data) => {
        if (data) {
          const groups = groupDriverWeeklyMileageByDispatcher(data);
          driverWeeklyMileageData.setDriversMileageGroups(
            Object.values(groups),
          );
          const driversWeeklyMileage = data.map((item) =>
            mapDriverWeeklyMileageResponseToDriverWeeklyMileage(item),
          );
          driverWeeklyMileageData.setCurrentDriversWeeklyMileage(
            driversWeeklyMileage,
          );
          driverWeeklyMileageData.setPreviousDriversWeeklyMileage(
            driversWeeklyMileage,
          );
        } else {
          toastData.withErrorMessage(INTERNAL_SERVER_ERROR);
        }
      })
      .catch((err) =>
        toastData.withErrorMessage(err.message || INTERNAL_SERVER_ERROR),
      );
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
        <PageHeader
          header="Trucks Board"
          subheader="The Weekly Mileage of Drivers"
        />
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
            scrollableColumns={week.map((day) => day.slice(0, day.length - 5))}
            scrollableColumnsLayout={TRUCKS_BOARD_WEEK_DAYS_COLUMNS_LAYOUT}
          />
          <DriversMileageView
            driverWeeklyMileageData={driverWeeklyMileageData}
          />
        </div>
        <div className="flex flex-row justify-center mt-10 mb-4">
          {WEEKS.map((week, index) => {
            const firstParts = week[0].split(BLANK_SPACE)[1].split(DOT);
            const lastParts = week[week.length - 1]
              .split(BLANK_SPACE)[1]
              .split(DOT);
            const interval = `${firstParts[1]}${HYPHEN}${firstParts[0]}${HYPHEN}${firstParts[2]} ${HYPHEN} ${lastParts[1]}${HYPHEN}${lastParts[0]}${HYPHEN}${lastParts[2]}`;
            return (
              <WeeklyBoardBar
                key={index}
                interval={interval}
                isActive={activeBars[index]}
                setWeek={() => {
                  setWeek(WEEKS[index]);
                  setActiveBars((prev) => prev.map((_, i) => i === index));
                }}
              />
            );
          })}
        </div>
        <ToastRenderer toast={toastData} />
      </div>
    </div>
  );
};
