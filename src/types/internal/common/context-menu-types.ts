import React from "react";

export interface ContextMenuData {
  getX: () => number;
  getY: () => number;
  isActive: () => boolean;
  open: (e: React.MouseEvent) => void;
  close: () => void;
}

export interface ContextMenuActionItem {
  action: () => void;
  label: string;
  svgPath: string;
  level?: number;
}
