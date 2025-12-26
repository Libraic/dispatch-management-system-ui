import React from "react";
import { useActivator } from "../../../../hooks/useActivator.ts";
import type {
  DriverMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import { extractMileageDataFromDriverMileageDataByDay } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { MileageFormModal } from "./MileageFormModal.tsx";

export const DriverCalendarCell: React.FC<{
  day: string;
  upsertDriverMileageData: (driver: Driver, mileage: MileageData) => void;
  driverMileageData: DriverMileageData;
  isEditable: boolean;
}> = ({ day, upsertDriverMileageData, driverMileageData, isEditable }) => {
  const mileageFormActivator = useActivator();
  const mileageDataString = extractMileageDataFromDriverMileageDataByDay(
    day,
    driverMileageData,
  );
  return (
    <React.Fragment>
      <div
        className={`flex items-center justify-center whitespace-pre-line text-center w-[5rem] border-1 border-gray-400 text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 border-r-0 border-t-0 last:border-r-1 h-[4rem] ${mileageDataString !== BLANK_STRING ? "bg-pale-blue" : "bg-gray-50"}`}
        onDoubleClick={() => {
          if (isEditable) {
            mileageFormActivator.change();
          }
        }}
      >
        {mileageDataString}
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
