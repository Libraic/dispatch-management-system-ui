import { LiveSearchCell } from "../../../matrix/LiveSearchCell.tsx";
import { Driver } from "../../../types/api/Driver.ts";
import { User } from "../../../types/api/User.ts";
import { useState } from "react";
import type { Renderable } from "../../../types/api/Renderable.ts";
import { ViewableCell } from "../../../matrix/ViewableCell.tsx";
import type { DriverWeeklyMileage } from "../../../types/financial/trucks-board.ts";
import {
  alterDriverWeeklyMileageDriver,
  getBlankDriverWeeklyMileage,
} from "../../../utils/financial/trucks-board-utils.ts";
import { BLANK_STRING } from "../../../utils/constants/global.ts";
import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../../utils/date.ts";
import { LiveSearchKey } from "../../../types/forms.ts";
import { DailyMileages } from "./DailyMileages.tsx";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import { TotalRevenueAndMiles } from "./TotalRevenueAndMiles.tsx";
import { queryDriversByCompanyId } from "../../../utils/constants/api-query.ts";

export const TrucksBoard = () => {
  const columnsLayout = "grid-cols-[9rem_17rem_6rem_10rem_repeat(7,20rem)]";
  const date = new Date();
  const primaryColumns = ["Dispatcher", "Driver", "Truck", "Revenue"];
  const weekDays = getWeekWithNames(date);
  const columns = [...primaryColumns, ...weekDays];
  const { companyUuid } = useParams();
  const [driverWeeklyMileage, setDriverWeeklyMileage] =
    useState<DriverWeeklyMileage>(getBlankDriverWeeklyMileage(weekDays));

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10 text-[0.8rem]">
      <div className="w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <MatrixHeader columns={columns} columnsLayout={columnsLayout} />
        <div
          className={`min-w-[1000px] min-h-[6rem] ${columnsLayout} grid grid-cols-3 rounded-[0.3rem] font-open-sans font-light bg-white`}
        >
          <LiveSearchCell
            defaultSearchKey={LiveSearchKey.USER}
            constructor={User}
          />
          <LiveSearchCell
            defaultSearchKey={LiveSearchKey.DRIVER}
            constructor={Driver}
            saveObject={(driver: Renderable) =>
              alterDriverWeeklyMileageDriver(driver, setDriverWeeklyMileage)
            }
            customSearchCriteria={[queryDriversByCompanyId(companyUuid!!)]}
          />
          <ViewableCell
            data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
          ></ViewableCell>
          <TotalRevenueAndMiles mileages={driverWeeklyMileage.mileages} />
          <DailyMileages
            driverWeeklyMileage={driverWeeklyMileage}
            setDriverWeeklyMileage={setDriverWeeklyMileage}
          />
        </div>
      </div>
    </div>
  );
};
