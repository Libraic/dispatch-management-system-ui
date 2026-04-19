import * as React from "react";
import { HOVER_TEXT_SOLID_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import type { Renderable } from "#/types/internal/classes/Renderable";

type InputFieldItemsListProps = {
  items: Renderable[];
  onClick: (item: Renderable) => void;
};

export const InputFieldItemsList: React.FC<InputFieldItemsListProps> = ({
  items,
  onClick,
}) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.getUuid()}
          className={`w-full rounded hover:bg-[#edf2fe] ${HOVER_TEXT_SOLID_COLOR} hover:cursor-pointer text-[0.9rem] font-normal text-center`}
          onClick={() => onClick(item)}
        >
          {item.renderOnList()}
        </div>
      ))}
    </>
  );
};
