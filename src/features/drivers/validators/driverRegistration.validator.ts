import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "#/features/drivers/components/Registration/types/driverRegistration.types";
import {
  validateEmail,
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";

export const getDriverRegistrationErrors = (
  driverRegistrationData: DriverRegistrationData,
  sections: string[],
): {
  erroneousSections: string[];
  registrationErrors: DriverRegistrationError;
} => {
  const map: Record<
    string,
    (driverRegistrationData: DriverRegistrationData) => DriverRegistrationError
  > = {
    [DRIVER_REGISTRATION_SECTIONS.GENERAL_DETAILS]: validateGeneralSection,
    [DRIVER_REGISTRATION_SECTIONS.ASSIGNMENTS]: validateAssignmentsSection,
  };

  const erroneousSections = [];
  const driverRegistrationError = {} as DriverRegistrationError;
  for (const section of sections) {
    const sectionValidator = map[section];
    if (!sectionValidator) {
      continue;
    }
    const sectionErrors = map[section](driverRegistrationData);
    if (Object.keys(sectionErrors).length > 0) {
      erroneousSections.push(section);
      Object.assign(driverRegistrationError, sectionErrors);
    }
  }

  return { erroneousSections, registrationErrors: driverRegistrationError };
};

export const getErroneousSections = (
  driverRegistrationError: DriverRegistrationError,
): string[] => {
  const sections = [];

  const hasGeneralSectionErrors = Boolean(
    driverRegistrationError.firstName ||
      driverRegistrationError.lastName ||
      driverRegistrationError.email ||
      driverRegistrationError.phoneNumber,
  );
  if (hasGeneralSectionErrors) {
    sections.push(DRIVER_REGISTRATION_SECTIONS.GENERAL_DETAILS);
  }

  if (driverRegistrationError.dispatcher !== undefined) {
    sections.push(DRIVER_REGISTRATION_SECTIONS.ASSIGNMENTS);
  }

  return sections;
};

export const validateGeneralSection = (
  driverRegistrationData: DriverRegistrationData,
) => {
  const driverRegistrationError = {} as DriverRegistrationError;
  const firstNameValidation = validateMandatoryField(
    driverRegistrationData.firstName,
    "first name",
  );
  if (firstNameValidation) {
    driverRegistrationError.firstName = firstNameValidation;
  }

  const lastNameValidation = validateMandatoryField(
    driverRegistrationData.lastName,
    "last name",
  );
  if (lastNameValidation) {
    driverRegistrationError.lastName = lastNameValidation;
  }

  const phoneNumberValidation = validatePhoneNumber(
    driverRegistrationData.phoneNumber,
    "mandatory",
    "phone number",
  );
  if (phoneNumberValidation) {
    driverRegistrationError.phoneNumber = phoneNumberValidation;
  }

  const emailValidation = validateEmail(driverRegistrationData.email, true);
  if (emailValidation) {
    driverRegistrationError.email = emailValidation;
  }

  return driverRegistrationError;
};

export const validateAssignmentsSection = (
  driverRegistrationData: DriverRegistrationData,
) => {
  const driverRegistrationError = {} as DriverRegistrationError;
  const dispatcherValidation = validateMandatoryField(
    driverRegistrationData.dispatcherAssignmentData?.uuid,
    "dispatcher",
  );
  if (dispatcherValidation) {
    driverRegistrationError.dispatcher = dispatcherValidation;
  }

  return driverRegistrationError;
};
