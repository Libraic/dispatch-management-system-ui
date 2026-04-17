import React from "react";
import { SYSTEM_FONT_LIGHT } from "#/tailwind/tailwind-font-vars";
import { TABLE_BORDER_BASE_COLOR } from "#/tailwind/tailwind-colors-vars";

type DriverRowCellContainerProps = {
  value: string;
};

export const DriverRowCellContainer: React.FC<DriverRowCellContainerProps> = ({
  value,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${SYSTEM_FONT_LIGHT} h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
    >
      {value}
    </div>
  );
};
