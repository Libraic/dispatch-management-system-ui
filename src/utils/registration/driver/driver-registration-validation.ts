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

  driverRegistrationError.maxLegalWeightCapacity = validateNumericField(
    driverRegistrationData.maxLegalWeightCapacity,
    "max legal weight capacity",
  );

  driverRegistrationError.height = validateNumericField(
    driverRegistrationData.height,
    "height",
  );

  return driverRegistrationError;
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
      driverRegistrationError.height !== BLANK_STRING ||
      driverRegistrationError.maxLegalWeightCapacity !== BLANK_STRING
    );
  }

  return false;
};

const validateNumericField = (value: string, field: string) => {
  const validateDataPresence = validateMandatoryField(value, field);
  if (validateDataPresence !== BLANK_STRING) {
    return validateDataPresence;
  }

  if (value.indexOf("-") >= 0) {
    return "Only positive numbers are allowed.";
  }

  return BLANK_STRING;
};
