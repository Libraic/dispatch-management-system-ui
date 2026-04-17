import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { type LoadStatus } from "#/types/internal/planner/planner-types";

export const getDeleteOption = (action: () => void): ContextMenuActionItem => {
  return {
    icon: "delete",
    label: "Delete",
    action: action,
  };
};

export const getChangeStatusOptions = (
  action: (status: LoadStatus) => void,
): ContextMenuActionItem[] => {
  const level = 0;

  return [
    {
      icon: "event_available",
      label: "Booked",
      action: () => action("Booked"),
      level: level,
    },
    {
      icon: "local_shipping",
      label: "Dispatched",
      action: () => action("Dispatched"),
      level: level,
    },
    {
      icon: "alt_route",
      label: "Transit",
      action: () => action("Transit"),
      level: level,
    },
    {
      icon: "task_alt",
      label: "Delivered",
      action: () => action("Delivered"),
      level: level,
    },
    {
      icon: "description",
      label: "Docs Sent",
      action: () => action("Docs Sent"),
      level: level,
    },
    {
      icon: "receipt_long",
      label: "Invoiced",
      action: () => action("Invoiced"),
      level: level,
    },
    {
      icon: "paid",
      label: "Paid",
      action: () => action("Paid"),
      level: level,
    },
  ];
};
