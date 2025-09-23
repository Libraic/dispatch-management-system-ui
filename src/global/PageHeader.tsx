import * as React from "react";
import type { HeaderInfo } from "../utils/constants/headers.ts";

export const PageHeader: React.FC<{
  headerInfo: HeaderInfo;
}> = ({ headerInfo }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] flex-col">
      <p className="font-lato font-bold text-[2rem]">{headerInfo.header}</p>
      <p className="font-lato font-normal text-[1rem]">
        {headerInfo.subheader}
      </p>
    </div>
  );
};
