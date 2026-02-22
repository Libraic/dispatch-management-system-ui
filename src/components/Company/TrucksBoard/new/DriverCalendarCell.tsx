import React from "react";
import { useActivator } from "../../../../hooks/useActivator.ts";
import {
  type DriverMileageData,
  LoadStatusColor,
  type MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import { extractUnfocusedCellInformation } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { MileageFormModal } from "./MileageFormModal.tsx";

export const DriverCalendarCell: React.FC<{
  day: string;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  driverMileageData: DriverMileageData;
  isEditable: boolean;
}> = ({ day, upsertDriverMileageData, driverMileageData, isEditable }) => {
  const mileageFormActivator = useActivator();
  const unfocusedCellInformation = extractUnfocusedCellInformation(
    day,
    driverMileageData,
  );
  const loadStatus =
    driverMileageData.mileage.get(day)?.loadStatus ?? "Unknown";
  const bgColor = LoadStatusColor[loadStatus];
  return (
    <React.Fragment>
      <div
        className={`flex items-center justify-center whitespace-pre-line text-center border-1 border-gray-400 text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 border-r-0 border-t-0 last:border-r-1 h-[4rem] ${unfocusedCellInformation !== BLANK_STRING ? bgColor : "bg-red"}`}
        onDoubleClick={() => {
          if (isEditable) {
            mileageFormActivator.change();
          }
        }}
      >
        {unfocusedCellInformation}
      </div>
      {mileageFormActivator.isActive() && (
        <MileageFormModal
          day={day}
          deactivate={mileageFormActivator.deactivate}
          upsertDriverMileageData={upsertDriverMileageData}
          driverMileageData={driverMileageData}
        />
      )}
    </React.Fragment>
  );
};
