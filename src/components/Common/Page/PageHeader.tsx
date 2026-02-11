import * as React from "react";
import type { HeaderInfo } from "../../../types/internal/header/header-types.ts";

export const PageHeader: React.FC<{
  headerInfo: HeaderInfo;
}> = ({ headerInfo }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] mt-[1rem] flex-col">
      <p className="font-plus-jakarta-sans font-bold text-[2rem]">
        {headerInfo.header}
      </p>
      <p className="font-plus-jakarta-sans font-light text-[1rem]">
        {headerInfo.subheader}
      </p>
    </div>
  );
};
