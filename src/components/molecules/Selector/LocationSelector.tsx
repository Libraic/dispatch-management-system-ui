import { City, State } from "country-state-city";
import * as React from "react";
import { useEffect, useState } from "react";
import { SelectForm } from "../../atoms/SelectForm/SelectForm.tsx";
import {
  getStateIsoCode,
  renderStateByNameAndIsoCode,
  USA_COUNTRY_ISO_CODE,
} from "../../../utils/location/location-utils.ts";
import { BLANK_STRING } from "../../../constants/common/global-constants.ts";

export const LocationSelector: React.FC<{
  currentState: string;
  currentCity: string;
  setState: (state: string) => void;
  setCity: (city: string) => void;
}> = ({ currentState, currentCity, setState, setCity }) => {
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const statesData = State.getStatesOfCountry(USA_COUNTRY_ISO_CODE);
    setStates(statesData);
    const stateCode = getStateIsoCode(currentState);
    setCities(City.getCitiesOfState(USA_COUNTRY_ISO_CODE, stateCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row gap-x-20 justify-center">
      <SelectForm
        label="State"
        initialValue={currentState}
        data={states.map((state) => renderStateByNameAndIsoCode(state))}
        setElement={(state) => {
          setState(state);
          const stateCode = getStateIsoCode(state);
          const cities = City.getCitiesOfState(USA_COUNTRY_ISO_CODE, stateCode);
          setCities(cities);
          setCity(cities.length > 0 ? cities[0].name : BLANK_STRING);
        }}
      />
      <SelectForm
        label="City"
        initialValue={currentCity}
        data={cities.map((city) => city.name)}
        setElement={(city) => setCity(city)}
      />
    </div>
  );
};
