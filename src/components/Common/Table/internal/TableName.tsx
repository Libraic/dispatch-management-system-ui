import * as React from "react";
import type { PageHeaderData } from "../../../../types/internal/common/page-types.ts";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
} from "../../../../tailwind/tailwind-font-vars.ts";

export const TableName: React.FC<{
  headerData: PageHeaderData;
  icon: string;
}> = ({ headerData, icon }) => {
  return (
    <div className="flex flex-row items-center gap-x-[0.25rem]">
      <img className="w-25 h-25" src={icon} alt="view-icon" />
      <div className="flex flex-col">
        <p className={`${SYSTEM_FONT_BOLD} font-bold text-[1.5rem]`}>
          {headerData.header}
        </p>
        <p className={`${SYSTEM_FONT_LIGHT} text-[0.9rem] text-solid-black`}>
          {headerData.subheader}
        </p>
      </div>
    </div>
  );
};
