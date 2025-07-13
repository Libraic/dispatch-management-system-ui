import { City, type IState, State } from "country-state-city";

export const USA_COUNTRY_ISO_CODE = "US";
export const COUNTRY_CODE_SPLITTER = ", ";

export const getFirstStateOfCountryByIsoCode = (
  countryIsoCode: string,
): string => {
  const state: IState = State.getStatesOfCountry(countryIsoCode)[0];
  return `${state.name}, ${state.isoCode}`;
};

export const getFirstCityOfStateByCountryIsoCode = (
  countryIsoCode: string,
): string => {
  const stateIsoCode = State.getStatesOfCountry(countryIsoCode)[0].isoCode;
  return City.getCitiesOfState(countryIsoCode, stateIsoCode)[0].name;
};

export const renderStateByNameAndIsoCode = (state: IState) => {
  return `${state.name}${COUNTRY_CODE_SPLITTER}${state.isoCode}`;
};

export const getStateIsoCode = (state: string) => {
  return state.split(COUNTRY_CODE_SPLITTER)[1];
};