import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "../../types/registration/driver/driver-registration-types.ts";
import { getBlankDriverRegistrationError } from "./driver-registration-utils.ts";
import { BLANK_STRING } from "../constants/global-constants.ts";
import {
  validateEmail,
  validateMandatoryField,
} from "../registration/registration-utils.ts";
import { ErroneousSections } from "../../types/classes/ErroneousSections.ts";

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
  return driverRegistrationError;
};

export const getErroneousSection = (
  sections: string[],
  registrationErrors: DriverRegistrationError,
): ErroneousSections => {
  const erroneousSections = new ErroneousSections();
  for (const section of sections) {
    const isSectionWithErrors = hasSectionErrors(registrationErrors, section);
    if (isSectionWithErrors) {
      erroneousSections.setErroneousSection(section);
    }
  }
  return erroneousSections;
};

export const hasSectionErrors = (
  driverRegistrationError: DriverRegistrationError,
  section: string,
) => {
  if (section === DRIVER_REGISTRATION_SECTIONS.GENERAL_DETAILS) {
    return (
      driverRegistrationError.firstName !== BLANK_STRING ||
      driverRegistrationError.lastName !== BLANK_STRING ||
      driverRegistrationError.email !== BLANK_STRING ||
      driverRegistrationError.phoneNumber !== BLANK_STRING
    );
  }

  return false;
};
