import * as React from "react";

export const TableHead: React.FC<{
  columnsLayout: string;
  listColumns: string[];
}> = ({ columnsLayout, listColumns }) => {
  return (
    <>
      <div
        className={`grid ${columnsLayout} h-[2.75rem] w-[95%] bg-[#f4f4fb] font-inter font-bold text-[0.85rem] px-[2rem] rounded-t-[0.3rem]`}
      >
        {listColumns.map((column, index) => (
          <div className="flex items-center text-gray-500" key={index}>
            {column}
          </div>
        ))}
      </div>
    </>
  );
};
