import React, { useState } from "react";

export const useContextMenu = () => {
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const openContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    setMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });
  };

  const closeContextMenu = () => {
    setMenu((prev) => ({ ...prev, visible: false }));
  };

  return {
    getX: () => menu.x,
    getY: () => menu.y,
    isActive: () => menu.visible,
    open: openContextMenu,
    close: closeContextMenu,
  };
};
