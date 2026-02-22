import { MileageFormModal } from "./MileageFormModal.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import React from "react";
import type { DriverMileageData } from "../../../../types/internal/trucks-board/trucks-board-types.ts";

export const DispatchCalendarCell: React.FC<{
  day: string;
  isEditable: boolean;
  styles?: string;
}> = ({ day, isEditable, styles }) => {
  const mileageFormActivator = useActivator();
  return (
    <>
      <div
        className={`flex items-center justify-center text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 ${styles ?? BLANK_STRING}`}
        onDoubleClick={() => {
          if (isEditable) {
            mileageFormActivator.change();
          }
        }}
      ></div>
      {mileageFormActivator.isActive() && (
        <MileageFormModal
          day={day}
          deactivate={mileageFormActivator.deactivate}
          upsertDriverMileageData={() => {}}
          driverMileageData={{} as DriverMileageData}
        />
      )}
    </>
  );
};
