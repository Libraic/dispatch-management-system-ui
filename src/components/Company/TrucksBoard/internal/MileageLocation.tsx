import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { Entity } from "../../../../types/api/common/api-query-types.ts";
import { City } from "../../../../types/internal/classes/City.ts";
import { LiveSearchInputForm } from "../../../Common/LiveSearch/public/LiveSearchInputForm.tsx";
import React from "react";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import type {
  MileageData,
  MileageDataError,
  MileageLocationData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import { DateSelector } from "../../../Common/Selector/DateSelector.tsx";
import { MileageLocationContextMenu } from "../../../Common/Icon/MileageLocationContextMenu.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const MileageLocation: React.FC<{
  mileageStateData: StateData<MileageData, MileageDataError>;
  mileageLocation: MileageLocationData;
  errorMessage?: string;
}> = ({ mileageStateData, mileageLocation, errorMessage }) => {
  const label = mileageLocation.label;
  const value = mileageLocation.location;
  const dateLabel = `${label} Date`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: mileageLocation.uuid });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      className={`flex flex-row gap-x-5 items-center cursor-grab active:cursor-grabbing`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="mb-[2.8rem]">
        <MileageLocationContextMenu
          mileageStateData={mileageStateData}
          mileageLocation={mileageLocation}
        />
      </div>
      <LiveSearchInputForm
        label={label}
        placeholder="Los Angeles, CA"
        value={value}
        saveData={(city: Renderable) => {
          mileageStateData.setData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              mileageLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    location: city.renderOnForm(),
                  },
            ),
          }));
        }}
        cleanData={() => {
          mileageStateData.setData((prevData) => ({
            ...prevData,
            locations: prevData.locations.filter(
              (location) => mileageLocation.uuid !== location.uuid,
            ),
          }));
        }}
        entityType={Entity.CITY}
        constructor={City}
        isMandatory={true}
        errorMessage={errorMessage}
        tailwindProperties={{ width: "w-[14.2rem]" }}
      />
      <DateSelector label={dateLabel} date={mileageLocation.date} />
    </div>
  );
};
