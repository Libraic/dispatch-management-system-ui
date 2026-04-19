import * as React from "react";

type TableHeadProps = {
  columnsLayout: string;
  listColumns: string[];
};

export const TableHead: React.FC<TableHeadProps> = ({
  columnsLayout,
  listColumns,
}) => {
  return (
    <>
      <div
        className={`grid ${columnsLayout} h-[2.75rem] bg-[#f4f4fb] font-bold text-[0.85rem] px-[2rem] rounded-t-[0.3rem] w-[100%] tracking-wide`}
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
