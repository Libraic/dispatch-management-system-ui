import React from "react";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";
import {
  TABLE_BORDER_BASE_COLOR,
  TABLE_BOTTOM_BORDER_BASE_COLOR,
  TABLE_DELIMITER_BOTTOM_COLOR,
  TABLE_DELIMITER_LEFT_COLOR,
  TABLE_DELIMITER_RIGHT_COLOR,
  TABLE_DELIMITER_TOP_COLOR,
} from "../../../../tailwind/tailwind-colors-vars.ts";
import {
  TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER,
  TABLE_DELIMITER_THICKNESS_LEFT_BORDER,
  TABLE_DELIMITER_THICKNESS_RIGHT_BORDER,
  TABLE_DELIMITER_THICKNESS_TOP_BORDER,
  TABLE_NORMAL_THICKNESS_BOTTOM_BORDER,
  TABLE_NORMAL_THICKNESS_LEFT_BORDER,
  TABLE_NORMAL_THICKNESS_RIGHT_BORDER,
  TABLE_NORMAL_THICKNESS_TOP_BORDER,
} from "../../../../tailwind/tailwind-border-vars.ts";
import clsx from "clsx";
import { TRUCKS_BOARD_GRID_LAYOUT } from "../../../../constants/trucks-board/trucks-board-constants.ts";

export const TrucksBoardHeader: React.FC<{
  days: string[];
}> = ({ days }) => {
  const updatedDays = days.map((day) => day.substring(0, day.length - 5));
  const firstWeek = updatedDays.slice(0, 7);
  const columns = [
    "Dispatcher",
    "Driver",
    "Revenue",
    "Miles",
    "RPM",
    ...updatedDays,
  ];
  return (
    <div
      className={`sticky top-0 z-[1000] flex-shrink-0 bg-pale-blue grid ${TRUCKS_BOARD_GRID_LAYOUT} items-center w-fit h-[3.5rem] ${SYSTEM_FONT_BOLD} text-[0.85rem]`}
    >
      {columns.map((column, index) => (
        <div
          key={column}
          className={clsx(
            `
            ${column === "RPM" ? "border-r-0" : TABLE_NORMAL_THICKNESS_RIGHT_BORDER} 
            ${
              column === "Dispatcher" &&
              `${TABLE_NORMAL_THICKNESS_LEFT_BORDER} 
            ${TABLE_BORDER_BASE_COLOR}`
            } 
            ${firstWeek.indexOf(column) === 0 && `${TABLE_DELIMITER_THICKNESS_LEFT_BORDER} ${TABLE_DELIMITER_LEFT_COLOR}`} 
            ${firstWeek.indexOf(column) === 6 && `${TABLE_DELIMITER_THICKNESS_RIGHT_BORDER} ${TABLE_DELIMITER_RIGHT_COLOR}`} 
            ${
              firstWeek.indexOf(column) >= 0
                ? `${TABLE_DELIMITER_THICKNESS_TOP_BORDER} ${TABLE_DELIMITER_TOP_COLOR}`
                : `${TABLE_NORMAL_THICKNESS_TOP_BORDER} ${TABLE_BORDER_BASE_COLOR}`
            } ${index <= 4 ? `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}` : `${TABLE_NORMAL_THICKNESS_BOTTOM_BORDER} ${TABLE_BOTTOM_BORDER_BASE_COLOR}`} 
            px-3 flex items-center h-full ${TABLE_BORDER_BASE_COLOR}
          `,
          )}
        >
          <p>{column}</p>
        </div>
      ))}
    </div>
  );
};
