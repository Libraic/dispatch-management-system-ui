import React from "react";
import { TABLE_BORDER_BASE_COLOR } from "#/tailwind/tailwind-colors-vars";

type DriverRowCellContainerProps = {
  value: string;
};

export const DriverRowCellContainer: React.FC<DriverRowCellContainerProps> = ({
  value,
}) => {
  return (
    <div
      className={`flex items-center justify-center font-light h-full border-r-1 ${TABLE_BORDER_BASE_COLOR}`}
    >
      {value}
    </div>
  );
};
