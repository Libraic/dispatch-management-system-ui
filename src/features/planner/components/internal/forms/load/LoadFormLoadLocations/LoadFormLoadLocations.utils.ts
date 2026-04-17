import { type DragEndEvent } from "@dnd-kit/core";
import React from "react";
import type { LoadData } from "#/types/internal/planner/planner-types";
import { arrayMove } from "@dnd-kit/sortable";

export const handleDragEnd = (
  event: DragEndEvent,
  setLoadDataFn: React.Dispatch<React.SetStateAction<LoadData>>,
) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  setLoadDataFn((prev) => {
    const previousLocations = prev.locations;
    const oldIndex = previousLocations.findIndex((l) => l.uuid === active.id);
    const newIndex = previousLocations.findIndex((l) => l.uuid === over.id);

    const newArray = arrayMove(previousLocations, oldIndex, newIndex);

    const newLocations = newArray.map((location, index) => ({
      ...location,
      order: index,
    }));

    return {
      ...prev,
      locations: newLocations,
    };
  });
};
