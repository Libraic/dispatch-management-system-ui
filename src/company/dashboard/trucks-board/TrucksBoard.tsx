import { useState } from "react";
import type {
  DriversMileageErrors,
  DriverWeeklyMileage,
} from "../../../types/financial/trucks-board.ts";
import { useParams } from "react-router-dom";
import { getWeekWithNames } from "../../../utils/date.ts";
import { MatrixHeader } from "../../../matrix/MatrixHeader.tsx";
import addRecordUnfocused from "../../../assets/trucks-board/add-unfocused.svg";
import addRecordFocused from "../../../assets/trucks-board/add-focused.svg";
import deleteRecordUnfocused from "../../../assets/trucks-board/delete-unfocused.svg";
import deleteRecordFocused from "../../../assets/trucks-board/delete-focused.svg";
import saveRecordsUnfocused from "../../../assets/trucks-board/save-records-unfocused.svg";
import saveRecordsFocused from "../../../assets/trucks-board/save-records-focused.svg";
import { Button } from "./Button.tsx";
import {
  addDriverWeeklyMileage,
  saveDriversWeeklyMileage,
} from "../../../utils/financial/trucks-board-utils.ts";
import { WeeklyMileage } from "./WeeklyMileage.tsx";
import {
  TRUCKS_BOARD_COLUMNS_LAYOUT,
  TRUCKS_BOARD_PRIMARY_COLUMNS,
} from "../../../utils/financial/trucks-board-constants.ts";
import { PageHeader } from "../../../global/PageHeader.tsx";

const date = new Date();
const weekDays = getWeekWithNames(date);
const columns = [...TRUCKS_BOARD_PRIMARY_COLUMNS, ...weekDays];

export const TrucksBoard = () => {
  const { companyUuid } = useParams();
  const [driverWeeklyMileageApiResponse, setDriverWeeklyMileageApiResponse] =
    useState<DriverWeeklyMileage[]>([]);
  const [currentDriversWeeklyMileage, setCurrentDriversWeeklyMileage] =
    useState<DriverWeeklyMileage[]>([]);
  const [errors, setErrors] = useState<DriversMileageErrors>({});

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-10 text-[0.8rem]">
      <PageHeader
        header="Trucks Board"
        subheader="The Weekly Mileage of Drivers"
      />
      <div className="flex flex-col w-[90%] h-[90%] overflow-x-auto hide-scrollbar ">
        <div className="mb-3">
          <Button
            unfocusedResource={addRecordUnfocused}
            focusedResource={addRecordFocused}
            action={() =>
              addDriverWeeklyMileage(setCurrentDriversWeeklyMileage, weekDays)
            }
            information="Add a new record"
          />
          <Button
            unfocusedResource={deleteRecordUnfocused}
            focusedResource={deleteRecordFocused}
            action={() => {}}
            information="Delete a record"
          />
          <Button
            unfocusedResource={saveRecordsUnfocused}
            focusedResource={saveRecordsFocused}
            action={async () => {
              const response = await saveDriversWeeklyMileage(
                driverWeeklyMileageApiResponse,
                setDriverWeeklyMileageApiResponse,
                currentDriversWeeklyMileage,
                setCurrentDriversWeeklyMileage,
                companyUuid!!,
              );
              setErrors(response);
            }}
            information="Save records"
          />
        </div>

        <MatrixHeader
          columns={columns}
          columnsLayout={TRUCKS_BOARD_COLUMNS_LAYOUT}
        />
        {currentDriversWeeklyMileage.map((driverWeeklyMileage, index) => (
          <WeeklyMileage
            driverWeeklyMileage={driverWeeklyMileage}
            setDriversWeeklyMileages={setCurrentDriversWeeklyMileage}
            index={index}
            companyUuid={companyUuid!!}
            driverMileageError={errors[driverWeeklyMileage.itemIdentifier]}
          />
        ))}
      </div>
    </div>
  );
};
