import React from "react";
import { TABLE_BORDER_BASE_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";

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
