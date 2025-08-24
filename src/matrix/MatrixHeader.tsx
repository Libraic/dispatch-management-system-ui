import * as React from "react";

export const MatrixHeader: React.FC<{
  columns: string[];
  columnsLayout: string;
}> = ({ columns, columnsLayout }) => {
  return (
    <div
      className={`w-fit ${columnsLayout} grid text-left font-open-sans font-medium rounded-tl-[0.3rem] rounded-tr-[0.3rem] h-[3rem] bg-[#d4ddf8]`}
    >
      {columns.map((day, index) => (
        <div className="flex items-center px-4" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};
