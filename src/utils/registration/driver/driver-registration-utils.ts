import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "../../../types/registration/driver/driver-registration-types.ts";
import { BLANK_STRING } from "../../constants/global.ts";
import {
  getFirstCityOfStateByCountryIsoCode,
  getFirstStateOfCountryByIsoCode,
  USA_COUNTRY_ISO_CODE,
} from "../../location/location-utils.ts";
import type { CreateDriverRequest } from "../../../types/api/driver-api.ts";

export const trailerTypes = [
  "Flatbed",
  "Stepdeck",
  "Flatbed Conestoga",
  "Stepdeck Conestoga",
];
export const trailerLengths = ["48", "53"];
export const documentsStatuses = ["Work Permit", "Green Card", "Citizen"];
export const driverPositions = ["Owner Operator", "Company Driver"];

export const getBlankDriverRegistrationData = (): DriverRegistrationData => {
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    phoneNumber: BLANK_STRING,
    email: BLANK_STRING,
    truckNumber: BLANK_STRING,
    trailerNumber: BLANK_STRING,
    height: BLANK_STRING,
    maxLegalWeightCapacity: BLANK_STRING,
    trailerType: trailerTypes[0],
    trailerLength: trailerLengths[0],
    documentsStatus: documentsStatuses[0],
    position: driverPositions[0],
    state: getFirstStateOfCountryByIsoCode(USA_COUNTRY_ISO_CODE),
    city: getFirstCityOfStateByCountryIsoCode(USA_COUNTRY_ISO_CODE),
  };
};

export const getBlankDriverRegistrationError = (): DriverRegistrationError => {
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    phoneNumber: BLANK_STRING,
    email: BLANK_STRING,
    truckNumber: BLANK_STRING,
    trailerNumber: BLANK_STRING,
    height: BLANK_STRING,
    maxLegalWeightCapacity: BLANK_STRING,
  };
};

export const createCreateDriverRequestFromDriverRegistrationData = (
  driverRegistrationData: DriverRegistrationData,
  companyUuid: string,
): CreateDriverRequest => {
  return {
    firstName: driverRegistrationData.firstName,
    lastName: driverRegistrationData.lastName,
    phoneNumber: driverRegistrationData.phoneNumber,
    email: driverRegistrationData.email,
    truckNumber: driverRegistrationData.truckNumber,
    trailerNumber: driverRegistrationData.trailerNumber,
    trailerHeight: driverRegistrationData.height,
    maxLegalWeightCapacity: driverRegistrationData.maxLegalWeightCapacity,
    trailerType: driverRegistrationData.trailerType,
    trailerLength: driverRegistrationData.trailerLength,
    documentsStatus: driverRegistrationData.documentsStatus,
    position: driverRegistrationData.position,
    state: driverRegistrationData.state,
    city: driverRegistrationData.city,
    companyUuid: companyUuid,
  };
};
