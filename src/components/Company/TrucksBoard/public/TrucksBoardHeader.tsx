import React from "react";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";
import { TABLE_BORDER_BASE_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { TRUCKS_BOARD_GRID_LAYOUT } from "../../../../constants/trucks-board/trucks-board-constants.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";

export const TrucksBoardHeader: React.FC<{
  days: string[];
}> = ({ days }) => {
  const updatedDays = days.map((day) => day.substring(0, day.length - 5));
  const columns = ["Role", "Revenue", "Miles", "RPM", ...updatedDays];
  return (
    <div
      className={`sticky top-0 z-[1000] flex-shrink-0 bg-pale-blue grid ${TRUCKS_BOARD_GRID_LAYOUT} items-center w-fit h-[3.5rem] ${SYSTEM_FONT_BOLD} text-[0.85rem]`}
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
