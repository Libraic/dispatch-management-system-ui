import React from "react";
import type { LoadStatus } from "#/types/internal/planner/planner-types";
import { LoadBlockTooltipInfo } from "#/features/planner/components/internal/blocks/LoadBlockTooltip/LoadBlockTooltipInfo";

type LoadBlockTooltipProps = {
  loadNumber: string;
  loadStatus: LoadStatus;
  loadStatusColor: string;
  borderColor: string;
  backgroundColor: string;
  data: Map<string, string>;
};

export const LoadBlockTooltip: React.FC<LoadBlockTooltipProps> = ({
  loadNumber,
  loadStatus,
  loadStatusColor,
  borderColor,
  backgroundColor,
  data,
}) => {
  return (
    <div className="min-w-[20rem] h-fit px-2 py-1 tracking-tight rounded-md text-[0.8rem] border-1 bg-[#f9f9f9] border-gray-200 shadow-md">
      <div
        className={`flex flex-row justify-between items-center gap-x-5 border-l-[0.15rem] ${borderColor} font-bold`}
      >
        <p className="pl-2">Load# {loadNumber}</p>
        <p
          className={`${loadStatusColor} border-1 rounded-sm py-[0.1rem] px-[0.2rem] ${backgroundColor}`}
        >
          {loadStatus}
        </p>
      </div>
      <div className="text-gray-500 pt-2">
        {Array.from(data.entries()).map(([key, value]) => (
          <LoadBlockTooltipInfo key={key} label={key} value={value} />
        ))}
      </div>
    </div>
  );
};
