import * as React from "react";

export const ViewableCell: React.FC<{ data: string; font?: string }> = ({
  data,
  font,
}) => {
  const textFont = font ? `font-${font}` : "font-normal";
  return (
    <div
      className={`flex items-center ${textFont} bg-[#f5f7fc] border-r-3 border-b-3 border-[#d8ceff] w-full h-full caret-transparent px-4`}
    >
      {data}
    </div>
  );
};
