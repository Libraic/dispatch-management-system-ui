import React, { useRef } from "react";
import { useOnClickOutside } from "../../../../hooks/useClickOutside.ts";
import { ContextMenuAction } from "../internal/ContextMenuAction.tsx";
import { v4 as uuidv4 } from "uuid";
import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";

export const ContextMenu: React.FC<{
  x: number;
  y: number;
  deactivateContextMenuFn: () => void;
  actions: ContextMenuActionItem[];
}> = ({ x, y, deactivateContextMenuFn, actions }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(wrapperRef, () => deactivateContextMenuFn());

  return (
    <div
      ref={wrapperRef}
      className={`fixed z-10000 bg-[#f9f9fa]/70 backdrop-blur-lg w-[9rem] h-fit border-[0.08rem] border-gray-300 rounded-[0.35rem] p-[0.25rem]`}
      style={{
        top: y,
        left: x,
      }}
    >
      {actions.map((action) => (
        <ContextMenuAction
          key={uuidv4()}
          item={action}
          deactivateContextMenuFn={deactivateContextMenuFn}
        />
      ))}
    </div>
  );
};
