import { useState } from "react";
import type { DriverWeeklyMileage } from "../../../types/financial/trucks-board.ts";
import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../../utils/date.ts";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import addRecordUnfocused from "../../../assets/trucks-board/add-unfocused.svg";
import addRecordFocused from "../../../assets/trucks-board/add-focused.svg";
import { Button } from "./Button.tsx";
import { addDriverWeeklyMileage } from "../../../utils/financial/trucks-board-utils.ts";
import { WeeklyMileage } from "./WeeklyMileage.tsx";
import {
  TRUCKS_BOARD_COLUMNS_LAYOUT,
  TRUCKS_BOARD_PRIMARY_COLUMNS,
} from "../../../utils/financial/trucks-board-constants.ts";

export const TrucksBoard = () => {
  const date = new Date();
  const weekDays = getWeekWithNames(date);
  const columns = [...TRUCKS_BOARD_PRIMARY_COLUMNS, ...weekDays];
  const { companyUuid } = useParams();
  const [driversWeeklyMileages, setDriversWeeklyMileages] = useState<
    DriverWeeklyMileage[]
  >([]);

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10 text-[0.8rem]">
      <div className="flex flex-col w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <div className="mb-3">
          <Button
            unfocusedResource={addRecordUnfocused}
            focusedResource={addRecordFocused}
            action={() =>
              addDriverWeeklyMileage(setDriversWeeklyMileages, weekDays)
            }
            information="Add a new record"
          />
        </div>

        <MatrixHeader
          columns={columns}
          columnsLayout={TRUCKS_BOARD_COLUMNS_LAYOUT}
        />
        {driversWeeklyMileages.map((driverWeeklyMileage, index) => (
          <WeeklyMileage
            driverWeeklyMileage={driverWeeklyMileage}
            setDriversWeeklyMileages={setDriversWeeklyMileages}
            index={index}
            companyUuid={companyUuid!!}
          />
        ))}
      </div>
    </div>
  );
};
