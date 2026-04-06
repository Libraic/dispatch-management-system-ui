import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { Entity } from "../../../../types/api/common/api-query-types.ts";
import { City } from "../../../../types/internal/classes/City.ts";
import { LiveSearchInputForm } from "../../../Common/LiveSearch/public/LiveSearchInputForm.tsx";
import React from "react";
import type { StateData } from "../../../../types/internal/common/props-types.ts";
import type {
  LoadData,
  LoadDataError,
  LoadLocationData,
  Time,
} from "../../../../types/internal/planner/planner-types.ts";
import { DateSelector } from "../../../Common/Selector/DateSelector.tsx";
import { LoadLocationContextMenu } from "../../../Common/Icon/LoadLocationContextMenu.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TimePicker } from "../../../Common/TimePicker/public/TimePicker.tsx";

export const LoadLocation: React.FC<{
  loadStateData: StateData<LoadData, LoadDataError>;
  loadLocation: LoadLocationData;
}> = ({ loadStateData, loadLocation }) => {
  const label = loadLocation.label;
  const value = loadLocation.location;
  const dateLabel = `${label} Date`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: loadLocation.uuid });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const errorMessages = loadStateData.error.locationsErrors.get(
    loadLocation.uuid,
  );

  const changeTime = (time: Time) => {
    loadStateData.setData((prevData) => ({
      ...prevData,
      locations: prevData.locations.map((location) =>
        loadLocation.uuid !== location.uuid
          ? location
          : {
              ...location,
              time: time,
            },
      ),
    }));
  };

  const isDeliveryOrPickUp =
    loadLocation.label === "Pick Up" || loadLocation.label === "Delivery";

  return (
    <div
      className={`flex flex-row gap-x-5 items-center cursor-grab active:cursor-grabbing`}
      ref={isDeliveryOrPickUp ? setNodeRef : undefined}
      style={isDeliveryOrPickUp ? style : undefined}
      {...(isDeliveryOrPickUp ? attributes : {})}
      {...(isDeliveryOrPickUp ? listeners : {})}
    >
      <div className="mb-[2.8rem]">
        <LoadLocationContextMenu
          loadStateData={loadStateData}
          loadLocation={loadLocation}
        />
      </div>
      <LiveSearchInputForm
        label={label}
        placeholder="Los Angeles, CA"
        value={value}
        saveData={(city: Renderable) => {
          loadStateData.setData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              loadLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    location: city.renderOnForm(),
                  },
            ),
          }));
        }}
        entityType={Entity.CITY}
        constructor={City}
        isMandatory={true}
        errorMessage={errorMessages?.locationError}
        tailwindProperties={{ width: "w-[14.2rem]" }}
      />
      <DateSelector
        label={dateLabel}
        date={loadLocation.date}
        setDate={(date: Date) => {
          loadStateData.setData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              loadLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    date: date,
                  },
            ),
          }));
        }}
        errorMessage={errorMessages?.dateError}
      />
      {isDeliveryOrPickUp && (
        <TimePicker
          time={loadLocation.time!!}
          setTime={changeTime}
          label="ETA"
        />
      )}
    </div>
  );
};
