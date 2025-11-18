import * as React from "react";
import { NO_ERROR_BACKGROUND_STYLE } from "../../../../utils/matrix/cell-constants.ts";

export const ViewableCell: React.FC<{ data: string; font?: string }> = ({
  data,
  font,
}) => {
  const textFont = font ? `font-${font}` : "font-normal";
  return (
    <div
      className={`flex items-center ${textFont} bg-[#f5f7fc] ${NO_ERROR_BACKGROUND_STYLE} w-full h-full caret-transparent px-4`}
    >
      {data}
    </div>
  );
};
