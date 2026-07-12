import React from "react";
import { TABLE_BORDER_BASE_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import { PLANNER_GRID_LAYOUT } from "#/constants/planner/planner-constants";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { Z_INDEX_3 } from "#/shared/constants/tailwind/tailwindLayout.constants";
import { isoDaysToPlannerHeaderDays } from "#/features/planner/components/public/PlannerHeader/PlannerHeader.utils";

type PlannerHeaderProps = {
  days: string[];
};

export const PlannerHeader: React.FC<PlannerHeaderProps> = ({ days }) => {
  const updatedDays = isoDaysToPlannerHeaderDays(days);
  const columns = ["Role", "Revenue", "Miles", "RPM", ...updatedDays];
  return (
    <div
      className={`sticky top-0 ${Z_INDEX_3} flex-shrink-0 bg-pale-blue grid ${PLANNER_GRID_LAYOUT} items-center w-fit h-[3.5rem] font-bold text-[0.85rem]`}
    >
      {columns.map((column, index) => (
        <div
          key={column}
          className={`
            border-r-1
            ${TABLE_BORDER_BASE_COLOR}
            border-y-1 ${TABLE_BORDER_BASE_COLOR}
            ${index === 0 ? "border-l-1" : BLANK_STRING}
            px-3 flex items-center h-full
          `}
        >
          <p>{column}</p>
        </div>
      ))}
    </div>
  );
};
