import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";
import React, { useState } from "react";
import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";

export const ContextMenuAction: React.FC<{
  item: ContextMenuActionItem;
  deactivateContextMenuFn: () => void;
  drawLine?: boolean;
}> = ({ item, deactivateContextMenuFn, drawLine }) => {
  const [activeIcon, setActiveIcon] = useState(item.inactiveIcon);
  const action = () => {
    item.action();
    deactivateContextMenuFn();
  };
  return (
    <>
      {drawLine && <div className="my-1 border-t-[0.09rem] border-t-[#ccc]" />}
      <div
        className={`flex flex-row cursor-pointer justify-between items-center  hover:rounded-[0.15rem] hover:bg-light-blue hover:text-white ${SYSTEM_FONT_NORMAL} text-[0.8rem] px-2`}
        onMouseEnter={() => setActiveIcon(item.activeIcon)}
        onMouseLeave={() => setActiveIcon(item.inactiveIcon)}
        onClick={action}
      >
        <img src={activeIcon} alt="truck-icon" className="w-5 h-5" />
        <p>{item.label}</p>
      </div>
    </>
  );
};
