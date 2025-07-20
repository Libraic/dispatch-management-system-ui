import * as React from "react";

export const ViewableCell: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div className="flex items-center bg-[#f5f7fc] border-r-1 border-[#e6ebfa] w-full h-full caret-transparent px-4">
      {data}
    </div>
  );
};
