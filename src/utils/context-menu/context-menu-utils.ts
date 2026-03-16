import removeWhiteIcon from "../../assets/planner/load-menu/remove-white.svg";
import removeBlackIcon from "../../assets/planner/load-menu/remove-black.svg";
import type { ContextMenuActionItem } from "../../types/internal/common/context-menu-types.ts";

export const getDeleteOption = (action: () => void): ContextMenuActionItem => {
  return {
    activeIcon: removeWhiteIcon,
    inactiveIcon: removeBlackIcon,
    label: "Delete",
    action: action,
  };
};
