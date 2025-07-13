import {
  type DriverRegistrationData,
  type DriverRegistrationError,
  DriverRegistrationSectionEnum,
} from "../../../types/registration/driver/driver-registration-types.ts";
import { getBlankDriverRegistrationError } from "./driver-registration-utils.ts";
import { BLANK_STRING } from "../../constants/global.ts";
import {
  validateEmail,
  validateMandatoryField,
} from "../registration-utils.ts";

export const getDriverRegistrationErrors = (
  driverRegistrationData: DriverRegistrationData,
) => {
  const driverRegistrationError = getBlankDriverRegistrationError();
  driverRegistrationError.firstName = validateMandatoryField(
    driverRegistrationData.firstName,
    "first name",
  );
  driverRegistrationError.lastName = validateMandatoryField(
    driverRegistrationData.lastName,
    "last name",
  );
  driverRegistrationError.phoneNumber = validateMandatoryField(
    driverRegistrationData.phoneNumber,
    "phone number",
  );
  driverRegistrationError.email = validateEmail(
    driverRegistrationData.email,
    true,
  );
  driverRegistrationError.truckNumber = validateMandatoryField(
    driverRegistrationData.truckNumber,
    "truck number",
  );
  driverRegistrationError.trailerNumber = validateMandatoryField(
    driverRegistrationData.trailerNumber,
    "trailer number",
  );

  driverRegistrationError.maxLegalWeightCapacity =
    validateMaxLegalWeightCapacity(
      driverRegistrationData.maxLegalWeightCapacity,
    );

  return driverRegistrationError;
};

export const hasErrors = (driverRegistrationError: DriverRegistrationError) => {
  return (
    hasSectionErrors(
      driverRegistrationError,
      DriverRegistrationSectionEnum.GENERAL_DETAILS,
    ) ||
    hasSectionErrors(
      driverRegistrationError,
      DriverRegistrationSectionEnum.TRUCK_DETAILS,
    )
  );
};

export const hasSectionErrors = (
  driverRegistrationError: DriverRegistrationError,
  section: string,
) => {
  if (section === DriverRegistrationSectionEnum.GENERAL_DETAILS) {
    return (
      driverRegistrationError.firstName !== BLANK_STRING ||
      driverRegistrationError.lastName !== BLANK_STRING ||
      driverRegistrationError.email !== BLANK_STRING ||
      driverRegistrationError.phoneNumber !== BLANK_STRING
    );
  }

  if (section === DriverRegistrationSectionEnum.TRUCK_DETAILS) {
    return (
      driverRegistrationError.truckNumber !== BLANK_STRING ||
      driverRegistrationError.trailerNumber !== BLANK_STRING ||
      driverRegistrationError.maxLegalWeightCapacity !== BLANK_STRING
    );
  }

  return false;
};

const validateMaxLegalWeightCapacity = (value: string) => {
  const validateDataPresence = validateMandatoryField(
    value,
    "max legal weight capacity",
  );
  if (validateDataPresence !== BLANK_STRING) {
    return validateDataPresence;
  }

  if (value.indexOf("-") >= 0) {
    return "Only positive numbers are allowed.";
  }

  return BLANK_STRING;
};
