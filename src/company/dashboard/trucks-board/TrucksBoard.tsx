import { useParams } from "react-router-dom";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import { WeeklyMileage } from "./WeeklyMileage.tsx";
import {
  COLUMNS,
  TRUCKS_BOARD_COLUMNS_LAYOUT,
  WEEK_DAYS,
} from "../../../utils/trucks-board/trucks-board-constants.ts";
import { PageHeader } from "../../../global/PageHeader.tsx";
import { useDriverWeeklyMileage } from "../../../hooks/useDriverWeeklyMileage.ts";
import { OptionBar } from "./OptionBar.tsx";
import { useEffect } from "react";
import { fetchDriversMileageByCompanyUuid } from "../../../service/driver-mileage-service.ts";
import { mapDriverWeeklyMileageResponseToDriverWeeklyMileage } from "../../../utils/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../../utils/global/error-messages.ts";
import { ToastRenderer } from "../../../toast/ToastRenderer.tsx";

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const driverWeeklyMileageData = useDriverWeeklyMileage(
    companyUuid!!,
    WEEK_DAYS,
  );
  const toastData = useToast();

  useEffect(() => {
    fetchDriversMileageByCompanyUuid(companyUuid!!)
      .then((data) => {
        if (data) {
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
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10 text-[0.8rem]">
      <PageHeader
        header="Trucks Board"
        subheader="The Weekly Mileage of Drivers"
      />
      <div className="flex flex-col w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <OptionBar
          driverWeeklyMileageData={driverWeeklyMileageData}
          toast={toastData}
        />
        <MatrixHeader
          columns={COLUMNS}
          columnsLayout={TRUCKS_BOARD_COLUMNS_LAYOUT}
        />
        {driverWeeklyMileageData.currentDriversWeeklyMileage.map(
          (driverWeeklyMileage) => (
            <WeeklyMileage
              key={driverWeeklyMileage.itemIdentifier}
              driverWeeklyMileage={driverWeeklyMileage}
              driverWeeklyMileageData={driverWeeklyMileageData}
              driverMileageError={
                driverWeeklyMileageData.errors[
                  driverWeeklyMileage.itemIdentifier
                ]
              }
            />
          ),
        )}
      </div>
      <ToastRenderer toast={toastData} />
    </div>
  );
};
