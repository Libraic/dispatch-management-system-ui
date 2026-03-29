import React from "react";
import type {
  LoadData,
  LoadDataError,
} from "../../../../../types/internal/planner/planner-types.ts";
import type { StateData } from "../../../../../types/internal/common/props-types.ts";
import { LoadLocation } from "../LoadLocation.tsx";
import { LoadLocationCreator } from "../LoadLocationCreator.tsx";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const LoadFormLoadLocations: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
}> = ({ loadStateData }) => {
  const locations = loadStateData.data.locations;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    loadStateData.setData((prev) => {
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6, // user must move 6px before drag activates
      },
    }),
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext
        items={locations.map((location) => location.uuid)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col mb-[1.5rem] gap-y-[1rem]">
          <div className="flex flex-col gap-x-5 pt-5">
            {locations.map((location) => (
              <LoadLocation
                key={location.uuid}
                loadStateData={loadStateData}
                loadLocation={location}
              />
            ))}
          </div>
          <LoadLocationCreator loadStateData={loadStateData} />
        </div>
      </SortableContext>
    </DndContext>
  );
};
