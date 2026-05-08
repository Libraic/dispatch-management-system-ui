import { useOnClickOutside } from "#/hooks/useClickOutside";
import React, { useLayoutEffect, useRef, useState } from "react";
import type { ContextMenuActionItem } from "#/types/internal/common/context-menu-types";
import { ContextMenuAction } from "#/ui/ContextMenu/internal/ContextMenuAction";

type ContextMenuProps = {
  x: number;
  y: number;
  deactivateContextMenuFn: () => void;
  actions: ContextMenuActionItem[];
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  deactivateContextMenuFn,
  actions,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x, y });

  useOnClickOutside(wrapperRef, () => deactivateContextMenuFn());

  useLayoutEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const menu = wrapperRef.current;

    const rect = menu.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = x;
    let adjustedY = y;

    if (x + rect.width > viewportWidth) {
      adjustedX = viewportWidth - rect.width - 8;
    }

    if (y + rect.height > viewportHeight) {
      adjustedY = viewportHeight - rect.height - 8;
    }

    setPosition({
      x: Math.max(8, adjustedX),
      y: Math.max(8, adjustedY),
    });
  }, [x, y]);

  return (
    <div
      ref={wrapperRef}
      className="fixed z-[10000] bg-[#f9f9fa]/70 backdrop-blur-lg
                 w-[9rem] h-fit border-[0.08rem]
                 border-gray-300 rounded-[0.35rem] p-[0.25rem]"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {actions.map((action, index) => (
        <ContextMenuAction
          key={action.label}
          item={action}
          deactivateContextMenuFn={deactivateContextMenuFn}
          drawLine={
            index > 0 && actions[index].level !== actions[index - 1].level
          }
        />
      ))}
    </div>
  );
};
