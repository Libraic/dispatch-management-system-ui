import * as React from "react";
import type { HeaderInfo } from "../../../types/internal/header/header-types.ts";
import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
} from "../../../tailwind/tailwind-font-vars.ts";

export const PageHeader: React.FC<{
  headerInfo: HeaderInfo;
}> = ({ headerInfo }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] mt-[1rem] flex-col">
      <p className={`${SYSTEM_FONT_BOLD} text-[2rem]`}>{headerInfo.header}</p>
      <p className={`${SYSTEM_FONT_LIGHT} text-[1rem]`}>
        {headerInfo.subheader}
      </p>
    </div>
  );
};
