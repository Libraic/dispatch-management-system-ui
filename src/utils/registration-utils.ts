import { BLANK_STRING, DEFAULT_BIRTH_DATE } from "./global-constants.ts";
import {
  PositionEnum,
  type RegistrationData,
  type RegistrationDataError,
  RoleEnum,
  SectionEnum,
} from "../types/authentication.ts";
import { validateEmail, validatePassword } from "./validation-utils.ts";

export const getBlankRegistrationData = (): RegistrationData => {
  const date = new Date();
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    personalEmail: BLANK_STRING,
    birthDate: DEFAULT_BIRTH_DATE,
    employmentDate: {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    },
    role: RoleEnum.EMPLOYEE,
    position: PositionEnum.ACCOUNTANT,
    workload: [],
  };
};

export const getBlankRegistrationDataError = (): RegistrationDataError => {
  return {
    firstNameError: BLANK_STRING,
    lastNameError: BLANK_STRING,
    emailError: BLANK_STRING,
    passwordError: BLANK_STRING,
    confirmPasswordError: BLANK_STRING,
    personalEmailError: BLANK_STRING,
  };
};

export const getRegistrationDataErrors = (
  registrationData: RegistrationData,
): RegistrationDataError => {
  const registrationDataError = getBlankRegistrationDataError();
  if (registrationData.firstName === BLANK_STRING) {
    registrationDataError.firstNameError = "The first name is required";
  }

  if (registrationData.lastName === BLANK_STRING) {
    registrationDataError.lastNameError = "The last name is required";
  }

  registrationDataError.emailError = validateEmail(
    registrationData.email,
    true,
  );

  registrationDataError.passwordError = validatePassword(
    registrationData.password,
    registrationData.confirmPassword,
  );

  registrationDataError.personalEmailError = validateEmail(
    registrationData.personalEmail,
    false,
  );

  return registrationDataError;
};

export const getGroupedErrors = (
  registrationDataError: RegistrationDataError,
): Map<SectionEnum, boolean> => {
  const groupedErrors = new Map<SectionEnum, boolean>();
  groupedErrors.set(
    SectionEnum.BASIC_INFORMATION,
    areAccountErrors(registrationDataError),
  );
  groupedErrors.set(SectionEnum.EMPLOYMENT_INFORMATION, false);
  groupedErrors.set(SectionEnum.WORKLOAD, false);
  groupedErrors.set(SectionEnum.NOTES, false);
  return groupedErrors;
};

const areAccountErrors = (
  registrationDataError: RegistrationDataError,
): boolean => {
  return (
    registrationDataError.firstNameError !== BLANK_STRING ||
    registrationDataError.lastNameError !== BLANK_STRING ||
    registrationDataError.emailError !== BLANK_STRING ||
    registrationDataError.passwordError !== BLANK_STRING ||
    registrationDataError.personalEmailError !== BLANK_STRING
  );
};
