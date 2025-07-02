import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "../../../types/registration/driver/driver-registration-types.ts";
import { BLANK_STRING } from "../../constants/global.ts";

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
    maxLegalWeightCapacity: BLANK_STRING,
    trailerType: trailerTypes[0],
    trailerLength: trailerLengths[0],
    documentsStatus: documentsStatuses[0],
    position: driverPositions[0],
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
    maxLegalWeightCapacity: BLANK_STRING,
  };
};
