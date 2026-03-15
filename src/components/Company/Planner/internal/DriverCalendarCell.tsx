import React from "react";
import { useActivator } from "../../../../hooks/useActivator.ts";
import {
  type DriverLoadData,
  type LoadData,
} from "../../../../types/internal/planner/planner-types.ts";
import { LoadFormModal } from "./LoadFormModal.tsx";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { PLANNER_ROW_HEIGHT } from "../../../../constants/planner/planner-constants.ts";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import { normalizeDate } from "../../../../utils/global/date-utils.ts";

const getBorder = (day: string, loads: LoadData[]) => {
  const today = normalizeDate(new Date(day));
  for (const load of loads) {
    // TODO: Check why the load.startDate/load.endDate are coming as strings
    const startDate = normalizeDate(new Date(load.startDate));
    const endDate = normalizeDate(new Date(load.endDate));
    if (today === endDate) {
      return "border-r-1";
    }

    if (today >= startDate && today < endDate) {
      return "border-r-0";
    }
  }

  return "border-r-1";
};

export const DriverCalendarCell: React.FC<{
  day: string;
  upsertDriverLoadData: (driver: DriverData, loadData: LoadData) => void;
  driverLoadData: DriverLoadData;
  isEditable: boolean;
}> = ({ day, upsertDriverLoadData, driverLoadData, isEditable }) => {
  const toast = useToast();
  const loadFormActivator = useActivator();
  const border = getBorder(day, driverLoadData.loads);
  return (
    <React.Fragment>
      <div
        className={`${border} ${TABLE_BORDER_BASE_COLOR} border-b-1 flex items-center justify-center whitespace-pre-line text-center text-[0.75rem] ${isEditable && "hover:cursor-pointer"} select-none flex-shrink-0 ${PLANNER_ROW_HEIGHT} ${SYSTEM_FONT_BOLD} text-black/75`}
        onDoubleClick={() => {
          if (isEditable) {
            loadFormActivator.change();
          }
        }}
      ></div>
      {loadFormActivator.isActive() && (
        <LoadFormModal
          day={day}
          deactivate={loadFormActivator.deactivate}
          upsertLoadData={upsertDriverLoadData}
          driverLoadData={driverLoadData}
        />
      )}
      <ToastRenderer toast={toast} />
    </React.Fragment>
  );
};
