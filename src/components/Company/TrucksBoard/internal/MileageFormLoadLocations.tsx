import React from "react";
import type {
  MileageData,
  MileageDataError,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import { MileageLocation } from "./MileageLocation.tsx";
import { MileageLocationCreator } from "./MileageLocationCreator.tsx";
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

export const MileageFormLoadLocations: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
}> = ({ mileageStateData }) => {
  const locations = mileageStateData.data.locations;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    mileageStateData.setData((prev) => {
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
          <div className="flex flex-col gap-x-5 max-h-[19rem] pt-5 overflow-y-auto">
            {locations.map((location) => (
              <MileageLocation
                key={location.uuid}
                mileageStateData={mileageStateData}
                mileageLocation={location}
              />
            ))}
          </div>
          <MileageLocationCreator mileageStateData={mileageStateData} />
        </div>
      </SortableContext>
    </DndContext>
  );
};
