import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";
import React, { useState } from "react";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";
import { Svg } from "../../Icon/Svg.tsx";

export const ContextMenuAction: React.FC<{
  item: ContextMenuActionItem;
  deactivateContextMenuFn: () => void;
  drawLine?: boolean;
}> = ({ item, deactivateContextMenuFn, drawLine }) => {
  const [hovered, setHovered] = useState(false);

  const action = () => {
    item.action();
    deactivateContextMenuFn();
  };

  return (
    <>
      {drawLine && <div className="my-1 border-t-[0.09rem] border-t-[#ccc]" />}

      <div
        className={`flex flex-row cursor-pointer justify-between items-center hover:rounded-[0.15rem] hover:bg-light-blue hover:text-white ${SYSTEM_FONT_NORMAL} text-[0.8rem] px-2`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={action}
      >
        <Svg
          activeColor="#ffffff"
          inactiveColor="#6b7280"
          isHovered={hovered}
          svgPath={item.svgPath}
        />
        <p>{item.label}</p>
      </div>
    </>
  );
};
