import type { ContextMenuActionItem } from "../../../../types/internal/common/context-menu-types.ts";
import React from "react";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";
import { GoogleIcon } from "../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const ContextMenuAction: React.FC<{
  item: ContextMenuActionItem;
  deactivateContextMenuFn: () => void;
  drawLine?: boolean;
}> = ({ item, deactivateContextMenuFn, drawLine }) => {
  const action = () => {
    item.action();
    deactivateContextMenuFn();
  };

  return (
    <>
      {drawLine && <div className="my-1 border-t-[0.09rem] border-t-[#ccc]" />}

      <div
        className={`flex flex-row cursor-pointer justify-between items-center hover:rounded-[0.15rem] hover:bg-light-blue hover:text-white ${SYSTEM_FONT_NORMAL} text-[0.8rem] px-2`}
        onClick={action}
      >
        <GoogleIcon code={item.icon} size={1.5} />
        <p>{item.label}</p>
      </div>
    </>
  );
};
