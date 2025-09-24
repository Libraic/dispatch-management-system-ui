import * as React from "react";
import { Z_INDEX_TRUCKS_BOARD_TABLE } from "../utils/trucks-board/trucks-board-constants.ts";

export const MatrixHeader: React.FC<{
  stickyColumns: string[];
  stickyColumnsLayout: string;
  scrollableColumns?: string[];
  scrollableColumnsLayout?: string;
}> = ({
  stickyColumns,
  stickyColumnsLayout,
  scrollableColumns,
  scrollableColumnsLayout,
}) => {
  return (
    <div
      style={{ zIndex: Z_INDEX_TRUCKS_BOARD_TABLE }}
      className="flex mx-auto sticky top-0 font-open-sans font-bold w-fit text-[0.7rem] "
    >
      <div
        style={{ gridTemplateColumns: stickyColumnsLayout }}
        className={`grid bg-[#d4ddf8] sticky left-0 z-20 h-[3rem]`}
      >
        {stickyColumns.map((column, index) => (
          <div className="flex items-center px-4" key={index}>
            {column}
          </div>
        ))}
      </div>
      {scrollableColumns && (
        <div className="overflow-x-auto hide-scrollbar">
          <div
            style={{ gridTemplateColumns: scrollableColumnsLayout }}
            className={`grid bg-[#d4ddf8] h-[3rem]`}
          >
            {scrollableColumns.map((day, index) => (
              <div className="flex items-center px-4" key={index}>
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
