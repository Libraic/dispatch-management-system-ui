import React from "react";
import { useActivator } from "#/hooks/useActivator";
import {
  type SchedulableFormProps,
  type WorkforceActionData,
} from "#/types/internal/planner/planner-types";
import { SchedulableModal } from "./forms/SchedulableModal";
import { useToast } from "#/ui/Toast/useToast";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { PLANNER_ROW_HEIGHT } from "#/constants/planner/planner-constants";
import { SYSTEM_FONT_BOLD } from "#/tailwind/tailwind-font-vars";
import { TABLE_BORDER_BASE_COLOR } from "#/tailwind/tailwind-colors-vars";
import { normalizeDate } from "#/utils/global/date-utils";

const getBorderByActionData = (day: string, actions: WorkforceActionData[]) => {
  const today = normalizeDate(new Date(day));
  for (const action of actions) {
    const startDate = normalizeDate(new Date(action.startDate));
    const endDate = normalizeDate(new Date(action.endDate));
    if (today === endDate) {
      return "border-r-1";
    }

    if (today >= startDate && today < endDate) {
      return "border-r-0";
    }
  }

  return "border-r-1";
};

const getBorder = (day: string, formProps: SchedulableFormProps) => {
  const borderFromLoads = getBorderByActionData(day, formProps.workforce.loads);
  if (borderFromLoads === "border-r-0") {
    return "border-r-0";
  }

  const borderFromVehicleMaintenanceRecords = getBorderByActionData(
    day,
    formProps.workforce.vehicleMaintenanceRecords,
  );
  if (borderFromVehicleMaintenanceRecords === "border-r-0") {
    return "border-r-0";
  }

  return getBorderByActionData(day, formProps.workforce.daysOffPeriods);
};

export const PlannerCalendarCell: React.FC<{
  day: string;
  formProps: SchedulableFormProps;
}> = ({ day, formProps }) => {
  const toast = useToast();
  const loadFormActivator = useActivator();
  const border = getBorder(day, formProps);
  return (
    <React.Fragment>
      <div
        className={`${border} ${TABLE_BORDER_BASE_COLOR} border-b-1 flex items-center justify-center whitespace-pre-line text-center text-[0.75rem] hover:cursor-pointer select-none flex-shrink-0 ${PLANNER_ROW_HEIGHT} ${SYSTEM_FONT_BOLD} text-black/75`}
        onDoubleClick={() => loadFormActivator.change()}
      ></div>
      {loadFormActivator.isActive() && (
        <SchedulableModal
          deactivate={loadFormActivator.deactivate}
          props={formProps}
        />
      )}
      <ToastRenderer toast={toast} />
    </React.Fragment>
  );
};
