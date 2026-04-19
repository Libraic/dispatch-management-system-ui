import * as React from "react";
import type { PageHeaderProps } from "#/ui/PageHeader/PageHeader.types";

export const PageHeader: React.FC<PageHeaderProps> = ({ headerInfo }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] mt-[1rem] flex-col">
      <p className={`font-bold text-[2rem]`}>{headerInfo.header}</p>
      <p className={`font-light text-[1rem]`}>{headerInfo.subheader}</p>
    </div>
  );
};
