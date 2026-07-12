import * as React from "react";
import type { PageHeaderData } from "#/types/internal/common/page-types";

type TableNameProps = {
  headerData: PageHeaderData;
};

export const TableName: React.FC<TableNameProps> = ({ headerData }) => {
  return (
    <div className="flex flex-row items-center gap-x-[0.25rem]">
      <div className="flex flex-col">
        <p className={`font-bold text-[1.5rem]`}>{headerData.header}</p>
        <p className={`font-light text-[0.9rem] text-solid-black`}>
          {headerData.subheader}
        </p>
      </div>
    </div>
  );
};
