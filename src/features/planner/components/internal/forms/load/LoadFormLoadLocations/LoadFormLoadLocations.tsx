import { useContext } from "react";
import { LoadLocation } from "#/features/planner/components/internal/LoadLocation";
import { LoadLocationCreator } from "#/features/planner/components/internal/LoadLocationCreator";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LoadContext } from "#/features/planner/context/LoadContext";
import { handleDragEnd } from "#/features/planner/components/internal/forms/load/LoadFormLoadLocations/LoadFormLoadLocations.utils";

export const LoadFormLoadLocations = () => {
  const loadContext = useContext(LoadContext)!!;
  const locations = loadContext.loadData.locations;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6, // user must move 6px before drag activates
      },
    }),
  );

  return (
    <DndContext
      onDragEnd={(event: DragEndEvent) =>
        handleDragEnd(event, loadContext.setLoadData)
      }
      sensors={sensors}
    >
      <SortableContext
        items={locations.map((location) => location.uuid)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col mb-[1.5rem] gap-y-[1rem]">
          <div className="flex flex-col gap-x-5 gap-y-3 pt-5">
            {locations.map((location) => (
              <LoadLocation key={location.uuid} loadLocation={location} />
            ))}
          </div>
          <LoadLocationCreator />
        </div>
      </SortableContext>
    </DndContext>
  );
};
