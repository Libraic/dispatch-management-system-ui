import type { Renderable } from "#/types/internal/classes/Renderable";
import { Entity } from "#/types/api/common/api-query-types";
import { City } from "#/types/internal/classes/City";
import { LiveSearchInputField } from "#/ui/LiveSearchInputField/public/LiveSearchInputField/LiveSearchInputField";
import React, { useContext } from "react";
import type {
  LoadLocationData,
  Time,
} from "#/types/internal/planner/planner-types";
import { DateSelectorField } from "#/ui/Selectors/DateSelectorField";
import { LoadLocationContextMenu } from "#/features/planner/components/internal/LoadLocationContextMenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TimePicker } from "#/ui/TimePicker/public/TimePicker";
import { LoadContext } from "#/features/planner/context/LoadContext";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";

type LoadLocationProps = {
  loadLocation: LoadLocationData;
};

export const LoadLocation: React.FC<LoadLocationProps> = ({ loadLocation }) => {
  const loadContext = useContext(LoadContext)!!;
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

  const errorMessages = loadContext.loadDataErrors.locationsErrors?.get(
    loadLocation.uuid,
  );

  const changeTime = (time: Time) => {
    loadContext.setLoadData((prevData) => ({
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
      className={`
        flex flex-row gap-x-5 items-center 
        ${isDeliveryOrPickUp ? "cursor-grab" : BLANK_STRING} 
        ${isDeliveryOrPickUp ? "active:cursor-grabbing" : BLANK_STRING}
      `}
      ref={isDeliveryOrPickUp ? setNodeRef : undefined}
      style={isDeliveryOrPickUp ? style : undefined}
      {...(isDeliveryOrPickUp ? attributes : {})}
      {...(isDeliveryOrPickUp ? listeners : {})}
    >
      <div className="mb-[2.8rem]">
        <LoadLocationContextMenu loadLocation={loadLocation} />
      </div>
      <LiveSearchInputField
        label={label}
        placeholder="Los Angeles, CA"
        value={value}
        saveData={(city: Renderable) => {
          loadContext.setLoadData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              loadLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    timezone: (city as City).timezone,
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
      <TextualInputField
        label="Address"
        placeholder="742 Evergreen Terrace"
        inputFieldValue={loadLocation.address ?? BLANK_STRING}
        saveInputData={(address: string) => {
          loadContext.setLoadData((prevData) => ({
            ...prevData,
            locations: prevData.locations.map((location) =>
              loadLocation.uuid !== location.uuid
                ? location
                : {
                    ...location,
                    address: address,
                  },
            ),
          }));
        }}
      />
      <DateSelectorField
        label={dateLabel}
        date={loadLocation.date}
        setDate={(date: Date) => {
          loadContext.setLoadData((prevData) => ({
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
