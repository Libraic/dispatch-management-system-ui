import type { FC } from "react";
import { SYSTEM_FONT_NORMAL } from "#/tailwind/tailwind-font-vars";
import { Z_INDEX_HIGH_PRECEDENCE } from "#/tailwind/tailwind-layout-vars";
import { BORDER_NORMAL_COLOR } from "#/tailwind/tailwind-colors-vars";
import type { Period } from "#/types/internal/planner/planner-types";

type PeriodButtonProps = {
  label: Period;
  active: boolean;
  onClick: () => void;
};

export const PeriodButton: FC<PeriodButtonProps> = ({
  label,
  active,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`{
      flex-1 py-2 rounded-[10px] text-sm tracking-widest hover:cursor-pointer ${Z_INDEX_HIGH_PRECEDENCE},
      transition-all duration-150 ${SYSTEM_FONT_NORMAL} ${active ? `border-[0.07rem] ${BORDER_NORMAL_COLOR}` : "border-[0.07rem] border-[#757575]"},
      `}
    style={{
      background: active ? "#4e71ff" : "transparent",
      color: active ? "white" : "#757575",
    }}
  >
    {label}
  </button>
);
