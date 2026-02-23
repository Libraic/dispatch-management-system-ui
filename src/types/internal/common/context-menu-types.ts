export type ContextMenuActionItem = {
  activeIcon: string;
  inactiveIcon: string;
  action: () => void;
  label: string;
};
