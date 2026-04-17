import * as React from "react";
import type { PageHeaderData } from "#/types/internal/common/page-types";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
} from "#/tailwind/tailwind-font-vars";
import { GoogleIcon } from "#/ui/GoogleIcon/GoogleIcon";

type TableNameProps = {
  headerData: PageHeaderData;
  iconCode: string;
};

export const TableName: React.FC<TableNameProps> = ({
  headerData,
  iconCode,
}) => {
  return (
    <div className="flex flex-row items-center gap-x-[0.25rem]">
      <GoogleIcon code={iconCode} size={6} fontColor="#000" />
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
