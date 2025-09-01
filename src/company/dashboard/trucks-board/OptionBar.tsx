import { Button } from "./Button.tsx";
import addRecordUnfocused from "../../../assets/trucks-board/add-unfocused.svg";
import addRecordFocused from "../../../assets/trucks-board/add-focused.svg";
import { addDriverWeeklyMileage } from "../../../utils/trucks-board/trucks-board-utils.ts";
import deleteRecordUnfocused from "../../../assets/trucks-board/delete-unfocused.svg";
import deleteRecordFocused from "../../../assets/trucks-board/delete-focused.svg";
import saveRecordsUnfocused from "../../../assets/trucks-board/save-records-unfocused.svg";
import saveRecordsFocused from "../../../assets/trucks-board/save-records-focused.svg";
import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { saveDriversWeeklyMileage } from "../../../utils/trucks-board/trucks-board-api-utils.ts";

export const OptionBar: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
}> = ({ driverWeeklyMileageData }) => {
  return (
    <div className="mb-3 sticky left-0 z-10 ">
      <Button
        unfocusedResource={addRecordUnfocused}
        focusedResource={addRecordFocused}
        action={() =>
          addDriverWeeklyMileage(
            driverWeeklyMileageData.setCurrentDriversWeeklyMileage,
            driverWeeklyMileageData.getWeekDays(),
          )
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
            driverWeeklyMileageData,
          );
          driverWeeklyMileageData.setErrors(response);
        }}
        information="Save records"
      />
    </div>
  );
};
