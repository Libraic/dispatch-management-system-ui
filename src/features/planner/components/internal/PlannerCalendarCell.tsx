import React from "react";
import { useActivator } from "#/hooks/useActivator";
import { type SchedulableFormProps } from "#/types/internal/planner/planner-types";
import { SchedulableModal } from "./forms/SchedulableModal";
import { useToast } from "#/ui/Toast/useToast";
import { ToastRenderer } from "#/ui/Toast/ToastRenderer";
import { PLANNER_ROW_HEIGHT } from "#/constants/planner/planner-constants";
import { SYSTEM_FONT_BOLD } from "#/tailwind/tailwind-font-vars";
import { TABLE_BORDER_BASE_COLOR } from "#/tailwind/tailwind-colors-vars";

type PlannerCalendarCellProps = {
  formProps: SchedulableFormProps;
};

export const PlannerCalendarCell: React.FC<PlannerCalendarCellProps> = ({
  formProps,
}) => {
  const toast = useToast();
  const loadFormActivator = useActivator();
  return (
    <React.Fragment>
      <div
        className={`${TABLE_BORDER_BASE_COLOR} border-b-1 border-r-1 flex items-center justify-center whitespace-pre-line text-center text-[0.75rem] hover:cursor-pointer select-none flex-shrink-0 ${PLANNER_ROW_HEIGHT} ${SYSTEM_FONT_BOLD} text-black/75`}
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
