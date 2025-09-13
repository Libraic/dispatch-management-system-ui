import { IconButton } from "./IconButton.tsx";
import addRecordUnfocused from "../../../assets/trucks-board/add-unfocused.svg";
import addRecordFocused from "../../../assets/trucks-board/add-focused.svg";
import { addNewDriversMileageGroup } from "../../../utils/trucks-board/trucks-board-utils.ts";
import deleteRecordUnfocused from "../../../assets/trucks-board/delete-unfocused.svg";
import deleteRecordFocused from "../../../assets/trucks-board/delete-focused.svg";
import saveRecordsUnfocused from "../../../assets/trucks-board/save-records-unfocused.svg";
import saveRecordsFocused from "../../../assets/trucks-board/save-records-focused.svg";
import * as React from "react";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import {
  deleteDriversMileage,
  saveDriversWeeklyMileage,
} from "../../../utils/trucks-board/trucks-board-api-utils.ts";
import type { ToastData } from "../../../hooks/useToast.ts";

export const OptionBar: React.FC<{
  driverWeeklyMileageData: DriverWeeklyMileageData;
  toast: ToastData;
}> = ({ driverWeeklyMileageData, toast }) => {
  return (
    <div className="mb-3 sticky left-0 z-10 overflow-hidden">
      <IconButton
        unfocusedResource={addRecordUnfocused}
        focusedResource={addRecordFocused}
        action={() =>
          addNewDriversMileageGroup(
            driverWeeklyMileageData.setDriversMileageGroups,
            driverWeeklyMileageData.getWeekDays(),
          )
        }
        information="Add a new record"
      />
      <IconButton
        unfocusedResource={deleteRecordUnfocused}
        focusedResource={deleteRecordFocused}
        action={async () => {
          if (
            driverWeeklyMileageData.getIdentifiersMarkedForDeletion().length !==
            0
          ) {
            const response = await deleteDriversMileage(
              driverWeeklyMileageData,
            );
            if (!response) {
              toast.withSuccessMessage(
                "The records were successfully deleted.",
              );
            } else {
              toast.withErrorMessage(response.message);
            }
          }
        }}
        information="Delete a record"
      />
      <IconButton
        unfocusedResource={saveRecordsUnfocused}
        focusedResource={saveRecordsFocused}
        action={async () => {
          const response = await saveDriversWeeklyMileage(
            driverWeeklyMileageData,
          );
          driverWeeklyMileageData.setErrors(response);
          if (Object.keys(response).length === 0) {
            toast.withSuccessMessage("The records were successfully saved.");
          }
        }}
        information="Save records"
      />
    </div>
  );
};
