import {
  type NoteData,
  USER_REGISTRATION_SECTIONS,
  type UserRegistrationData,
  type UserRegistrationErrors,
  type WorkloadData,
} from "../../../types/registration/user/user-registration-data.ts";
import { BLANK_STRING } from "../../constants/global.ts";
import { validateEmail } from "../registration-utils.ts";
import {
  validateNotes,
  validatePassword,
} from "./user-registration-validation.ts";

export const getBlankUserRegistrationErrors = (): UserRegistrationErrors => {
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    personalEmail: BLANK_STRING,
    notes: [],
    workloads: [],
    supervisor: BLANK_STRING,
  };
};

export const getRegistrationDataErrors = (
  registrationData: UserRegistrationData,
): UserRegistrationErrors => {
  const registrationDataError = getBlankUserRegistrationErrors();
  if (registrationData.firstName === BLANK_STRING) {
    registrationDataError.firstName = "The first name is required";
  }

  if (registrationData.lastName === BLANK_STRING) {
    registrationDataError.lastName = "The last name is required";
  }

  registrationDataError.email = validateEmail(registrationData.email, true);

  registrationDataError.password = validatePassword(
    registrationData.password,
    registrationData.confirmPassword,
  );

  registrationDataError.personalEmail = validateEmail(
    registrationData.personalEmail,
    false,
  );

  registrationDataError.notes = validateNotes(registrationData.notes);

  return registrationDataError;
};

export const getSectionsWithErrors = (
  errors: UserRegistrationErrors,
): Map<string, boolean> => {
  const groupedErrors = getGroupedErrors(errors);
  const erroneousSections = new Map<string, boolean>();
  for (const [section, hasErrors] of groupedErrors) {
    erroneousSections.set(section, hasErrors);
  }
  return erroneousSections;
};

export const getNoteErrorMessage = (
  registrationDataError: UserRegistrationErrors,
  note: NoteData,
): string => {
  if (registrationDataError.notes.length === 0) {
    return BLANK_STRING;
  }

  return registrationDataError.notes.filter((n) => n.id === note.noteId)[0]
    .errorMessage;
};

export const getWorkloadCompanyErrorMessage = (
  registrationDataError: UserRegistrationErrors,
  workload: WorkloadData,
) => {
  if (registrationDataError.workloads.length === 0) {
    return BLANK_STRING;
  }

  return registrationDataError.workloads.filter(
    (w) => w.id === workload.workloadId && w.field === "company",
  )[0].errorMessage;
};

const getGroupedErrors = (
  registrationDataError: UserRegistrationErrors,
): Map<string, boolean> => {
  const groupedErrors = new Map<string, boolean>();
  groupedErrors.set(
    USER_REGISTRATION_SECTIONS.BASIC_INFORMATION,
    areAccountErrors(registrationDataError),
  );
  groupedErrors.set(
    USER_REGISTRATION_SECTIONS.EMPLOYMENT_INFORMATION,
    areEmploymentInformationErrors(registrationDataError),
  );
  groupedErrors.set(
    USER_REGISTRATION_SECTIONS.WORKLOAD,
    areWorkloadErrors(registrationDataError),
  );
  groupedErrors.set(
    USER_REGISTRATION_SECTIONS.NOTES,
    areNotesErrors(registrationDataError),
  );
  return groupedErrors;
};

const areAccountErrors = (
  registrationDataError: UserRegistrationErrors,
): boolean => {
  return (
    registrationDataError.firstName !== BLANK_STRING ||
    registrationDataError.lastName !== BLANK_STRING ||
    registrationDataError.email !== BLANK_STRING ||
    registrationDataError.password !== BLANK_STRING ||
    registrationDataError.personalEmail !== BLANK_STRING
  );
};

const areWorkloadErrors = (
  registrationDataError: UserRegistrationErrors,
): boolean => {
  return registrationDataError.workloads.length > 0;
};

const areEmploymentInformationErrors = (
  registrationDataError: UserRegistrationErrors,
): boolean => {
  return registrationDataError.supervisor !== BLANK_STRING;
};

const areNotesErrors = (
  registrationDataError: UserRegistrationErrors,
): boolean => registrationDataError.notes.length > 0;
