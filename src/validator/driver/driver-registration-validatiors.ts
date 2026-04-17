import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "#/types/internal/driver/driver-registration-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  validateEmail,
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";
import { ErroneousSections } from "#/types/internal/classes/ErroneousSections";
import { cleanPhoneNumber } from "#/shared/utils/inputField.formatter";

export const getDriverRegistrationErrors = (
  driverRegistrationData: DriverRegistrationData,
) => {
  const driverRegistrationError = {} as DriverRegistrationError;
  driverRegistrationError.firstName = validateMandatoryField(
    driverRegistrationData.firstName,
    "first name",
  );
  driverRegistrationError.lastName = validateMandatoryField(
    driverRegistrationData.lastName,
    "last name",
  );
  driverRegistrationError.phoneNumber = validatePhoneNumber(
    cleanPhoneNumber(driverRegistrationData.phoneNumber),
    "mandatory",
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
