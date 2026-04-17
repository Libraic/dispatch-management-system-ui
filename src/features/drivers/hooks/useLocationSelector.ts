import { City, State } from "country-state-city";
import { getStateIsoCode } from "#/utils/location/location-utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { useEffect, useState } from "react";

export function useLocationSelector(
  countryIso: string,
  currentState: string,
  setCity: (city: string) => void,
) {
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const statesData = State.getStatesOfCountry(countryIso);
    setStates(statesData);

    const stateCode = getStateIsoCode(currentState);
    const initialCities = City.getCitiesOfState(countryIso, stateCode);

    setCities(initialCities);
  }, [countryIso, currentState]);

  const onStateChange = (state: string, setState: (s: string) => void) => {
    setState(state);

    const stateCode = getStateIsoCode(state);
    const newCities = City.getCitiesOfState(countryIso, stateCode);

    setCities(newCities);
    setCity(newCities.length > 0 ? newCities[0].name : BLANK_STRING);
  };

  const onCityChange = (city: string) => {
    setCity(city);
  };

  return {
    states,
    cities,
    onStateChange,
    onCityChange,
  };
}
