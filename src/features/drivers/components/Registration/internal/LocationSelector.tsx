import * as React from "react";
import { SelectorField } from "#/ui/Selectors/SelectorField";
import {
  renderStateByNameAndIsoCode,
  USA_COUNTRY_ISO_CODE,
} from "#/utils/location/location-utils";
import { useLocationSelector } from "#/features/drivers/hooks/useLocationSelector";
import { BLANK_STRING } from "#/constants/common/global-constants";

type LocationSelectorProps = {
  currentState?: string;
  currentCity?: string;
  setState: (state: string) => void;
  setCity: (city: string) => void;
};

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentState,
  currentCity,
  setState,
  setCity,
}) => {
  const state = currentState ?? BLANK_STRING;
  const city = currentCity ?? BLANK_STRING;
  const { states, cities, onStateChange, onCityChange } = useLocationSelector(
    USA_COUNTRY_ISO_CODE,
    state,
    setCity,
  );

  return (
    <div className="flex flex-row gap-x-20 justify-center">
      <SelectorField
        label="State"
        initialValue={state}
        data={states.map(renderStateByNameAndIsoCode)}
        setElement={(state) => onStateChange(state, setState)}
      />

      <SelectorField
        label="City"
        initialValue={city}
        data={cities.map((city) => city.name)}
        setElement={onCityChange}
      />
    </div>
  );
};
