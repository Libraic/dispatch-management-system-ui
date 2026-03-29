import * as React from "react";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { HOVER_TEXT_SOLID_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { SYSTEM_FONT_NORMAL } from "../../../../tailwind/tailwind-font-vars.ts";

export const InputFormItemsList: React.FC<{
  items: Renderable[];
  onClick: (item: Renderable) => void;
}> = ({ items, onClick }) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.getUuid()}
          className={`w-full rounded hover:bg-[#edf2fe] ${HOVER_TEXT_SOLID_COLOR} hover:cursor-pointer text-standard-size ${SYSTEM_FONT_NORMAL} text-center`}
          onClick={() => onClick(item)}
        >
          {item.renderOnList()}
        </div>
      ))}
    </>
  );
};
