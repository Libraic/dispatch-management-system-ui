import * as React from "react";

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
    <div className="flex mx-auto sticky top-0 z-30 font-open-sans font-bold w-fit">
      <div
        className={`grid ${stickyColumnsLayout} bg-[#d4ddf8] sticky left-0 z-20 h-[3rem]`}
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
            className={`grid ${scrollableColumnsLayout} bg-[#d4ddf8] h-[3rem]`}
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
