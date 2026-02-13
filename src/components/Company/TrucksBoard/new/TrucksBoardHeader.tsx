import React from "react";
import { SYSTEM_FONT_BOLD } from "../../../../tailwind/tailwind-font-vars.ts";

export const TrucksBoardHeader: React.FC<{
  days: string[];
}> = ({ days }) => {
  const updatedDays = days.map((day) => day.substring(0, day.length - 5));
  const columns = ["Dispatcher", "Driver", "Revenue", "Miles", ...updatedDays];
  const gridLayout =
    "grid grid-cols-[15rem_15rem_9rem_17.1rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_5rem_4.88rem]";
  return (
    <div
      className={`sticky top-0 z-[1000] flex-shrink-0 bg-pale-blue ${gridLayout} items-center w-fit h-[4rem] border-1 ${SYSTEM_FONT_BOLD} text-[0.9rem] border-gray-400`}
    >
      {columns.map((column) => (
        <div
          key={column}
          className={`px-5 flex items-center h-full border-r-1 last:border-r-0 border-gray-400`}
        >
          <p>{column}</p>
        </div>
      ))}
    </div>
  );
};
