import { LiveSearchCell } from "../../matrix/LiveSearchCell.tsx";
import { Driver } from "../../types/api/Driver.ts";
import { User } from "../../types/api/User.ts";
import { useState } from "react";
import type { Renderable } from "../../types/api/Renderable.ts";
import { ViewableCell } from "../../matrix/ViewableCell.tsx";
import type { DriverWeeklyMileage } from "../../types/financial/trucks-board.ts";
import { getBlankDriverWeeklyMileage } from "../../utils/financial/trucks-board-utils.ts";
import { BLANK_STRING } from "../../utils/constants/global.ts";
import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../utils/date.ts";
import { LiveSearchKey } from "../../types/forms.ts";

export const TrucksBoard = () => {
  const columnsLayout =
    "grid-cols-[9rem_17rem_6rem_10rem_12rem_12rem_12rem_12rem_12rem_12rem_12rem]";
  const date = new Date();
  const primaryColumns = ["Dispatcher", "Driver", "Truck", "Revenue"];
  const weekDays = getWeekWithNames(date);
  const columns = [...primaryColumns, ...weekDays];
  const { companyUuid } = useParams();
  // Data that describe a row (will be centralized in a single object)
  const [driverWeeklyMileage, setDriverWeeklyMileage] =
    useState<DriverWeeklyMileage>(getBlankDriverWeeklyMileage());

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10">
      <div className="w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <div
          className={`w-fit ${columnsLayout} grid text-left font-open-sans font-medium rounded-tl-[0.3rem] rounded-tr-[0.3rem] h-[3rem] bg-[#d4ddf8]`}
        >
          {columns.map((day, index) => (
            <div className="flex items-center px-4" key={index}>
              {day}
            </div>
          ))}
        </div>

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
              setDriverWeeklyMileage((prev) => ({
                ...prev,
                driver: driver instanceof Driver ? driver : null,
              }))
            }
            customSearchCriteria={[
              {
                field: "companyId",
                operation: `join:${companyUuid}`,
              },
            ]}
          />
          <ViewableCell
            data={driverWeeklyMileage.driver?.getTruckData() ?? BLANK_STRING}
          ></ViewableCell>
          <div className="grid grid-rows-2">
            <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-b-1 border-[#e6ebfa] font-bold">
              $6,700
            </div>
            <div className="px-4 flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa] font-bold">
              2.07
            </div>
          </div>
          {weekDays.map((_, index) => (
            <div
              className="flex items-center px-4 bg-[#f5f7fc] border-r-1 border-[#e6ebfa]"
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
