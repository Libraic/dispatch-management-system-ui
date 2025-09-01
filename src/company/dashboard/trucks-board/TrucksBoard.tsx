import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../../utils/global/date.ts";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import { WeeklyMileage } from "./WeeklyMileage.tsx";
import {
  TRUCKS_BOARD_COLUMNS_LAYOUT,
  TRUCKS_BOARD_PRIMARY_COLUMNS,
} from "../../../utils/trucks-board/trucks-board-constants.ts";
import { PageHeader } from "../../../global/PageHeader.tsx";
import { useDriverWeeklyMileage } from "../../../hooks/useDriverWeeklyMileage.ts";
import { OptionBar } from "./OptionBar.tsx";
import { useEffect } from "react";
import { fetchDriversMileageByCompanyUuid } from "../../../service/driver-mileage-service.ts";
import { mapDriverWeeklyMileageResponseToDriverWeeklyMileage } from "../../../utils/trucks-board/trucks-board-api-utils.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { INTERNAL_SERVER_ERROR } from "../../../utils/global/error-messages.ts";
import { Toast } from "../../../toast/Toast.tsx";

const weekDays = getWeekWithNames(new Date());
const columns = [...TRUCKS_BOARD_PRIMARY_COLUMNS, ...weekDays];

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const driverWeeklyMileageData = useDriverWeeklyMileage(
    companyUuid!!,
    weekDays,
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
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10 text-[0.8rem]">
      <PageHeader
        header="Trucks Board"
        subheader="The Weekly Mileage of Drivers"
      />
      <div className="flex flex-col w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <OptionBar driverWeeklyMileageData={driverWeeklyMileageData} />
        <MatrixHeader
          columns={columns}
          columnsLayout={TRUCKS_BOARD_COLUMNS_LAYOUT}
        />
        {driverWeeklyMileageData.currentDriversWeeklyMileage.map(
          (driverWeeklyMileage, index) => (
            <WeeklyMileage
              driverWeeklyMileage={driverWeeklyMileage}
              setDriversWeeklyMileages={
                driverWeeklyMileageData.setCurrentDriversWeeklyMileage
              }
              index={index}
              companyUuid={driverWeeklyMileageData.getCompanyUuid()}
              driverMileageError={
                driverWeeklyMileageData.errors[
                  driverWeeklyMileage.itemIdentifier
                ]
              }
            />
          ),
        )}
      </div>
      {toastData.getMessage().length > 0 && (
        <Toast
          key={toastData.getIdentifier()}
          message={toastData.getMessage()}
          type={toastData.getOperationResult()}
        />
      )}
    </div>
  );
};
