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

const weekDays = getWeekWithNames(new Date());
const columns = [...TRUCKS_BOARD_PRIMARY_COLUMNS, ...weekDays];

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const driverWeeklyMileageData = useDriverWeeklyMileage(
    companyUuid!!,
    weekDays,
  );

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
    </div>
  );
};
