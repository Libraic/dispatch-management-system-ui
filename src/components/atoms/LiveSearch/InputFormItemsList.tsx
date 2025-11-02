import * as React from "react";
import type { Renderable } from "../../../types/internal/classes/Renderable.ts";

export const InputFormItemsList: React.FC<{
  items: Renderable[];
  onClick: (item: Renderable) => void;
}> = ({ items, onClick }) => {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.getUuid()}
          className="w-full rounded hover:bg-[#edf2fe] hover:text-solid-blue hover:cursor-pointer text-standard-size font-lato font-normal text-center"
          onClick={() => onClick(item)}
        >
          {item.renderOnList()}
        </div>
      ))}
    </>
  );
};
