import React from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import dragIndicatorIcon from "../../../../assets/planner/drag-indicator.svg";

export const Draggable: React.FC<{
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}> = ({ attributes, listeners }) => {
  return (
    <div
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing select-none ml-[0.25rem] mb-[2.8rem] w-[1rem]"
    >
      <img src={dragIndicatorIcon} alt="Drag Indicator" />
    </div>
  );
};
