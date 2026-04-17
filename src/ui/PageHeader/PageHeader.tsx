import * as React from "react";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
} from "#/tailwind/tailwind-font-vars";
import type { PageHeaderProps } from "#/ui/PageHeader/PageHeader.types";

export const PageHeader: React.FC<PageHeaderProps> = ({ headerInfo }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] mt-[1rem] flex-col">
      <p className={`${SYSTEM_FONT_BOLD} text-[2rem]`}>{headerInfo.header}</p>
      <p className={`${SYSTEM_FONT_LIGHT} text-[1rem]`}>
        {headerInfo.subheader}
      </p>
    </div>
  );
};
