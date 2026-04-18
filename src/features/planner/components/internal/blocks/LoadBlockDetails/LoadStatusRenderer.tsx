import type { LoadStatus } from "#/types/internal/planner/planner-types";
import { SYSTEM_FONT_BOLD } from "#/tailwind/tailwind-font-vars";
import React from "react";

type LoadStatusRendererProps = {
  loadStatus: LoadStatus;
  textColor: string;
};

export const LoadStatusRenderer: React.FC<LoadStatusRendererProps> = ({
  loadStatus,
  textColor,
}) => {
  return (
    <div
      className={`w-fit text-center border-[0.05rem] rounded-[0.2rem] text-[0.6rem] px-[0.2rem] py-[0.1rem] ${textColor} ${SYSTEM_FONT_BOLD}`}
    >
      <p>{loadStatus}</p>
    </div>
  );
};
