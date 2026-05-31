import type { LoadStatus } from "#/types/internal/planner/planner-types";
import { LOAD_STATUS_COLORS } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.constants";

const getAdditionalStyle = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const status = value as LoadStatus;
  const backgroundColor = LOAD_STATUS_COLORS[status].backgroundColor;
  const textColor = LOAD_STATUS_COLORS[status].textColor;
  return `${backgroundColor} ${textColor} w-fit rounded px-1`;
};

export const STYLES: Record<string, (value?: string) => string | undefined> = {
  status: getAdditionalStyle,
};
