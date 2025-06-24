import type {
  FieldError,
  ItemError,
  NoteData,
  UserRegistrationData,
  RegistrationDataError,
  WorkloadData,
} from "../../../types/registration/user/user-registration-data.ts";
import { BLANK_STRING } from "../../constants/global.ts";
import {
  validateEmail,
  validateNotes,
  validatePassword,
} from "./user-registration-validation.ts";
import { SectionEnum } from "../../../types/registration/user/section.ts";

export const getBlankRegistrationDataError = (): RegistrationDataError => {
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
): RegistrationDataError => {
  const registrationDataError = getBlankRegistrationDataError();
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

export const getSectionsWithErrors = (errors: RegistrationDataError) => {
  const groupedErrors = getGroupedErrors(errors);
  const sectionsErrors: SectionEnum[] = [];
  for (const [section, hasErrors] of groupedErrors) {
    if (hasErrors) {
      sectionsErrors.push(section);
    }
  }
  return sectionsErrors;
};

export const getNoteErrorMessage = (
  registrationDataError: RegistrationDataError,
  note: NoteData,
): string => {
  if (registrationDataError.notes.length === 0) {
    return BLANK_STRING;
  }

  const itemsErrors: ItemError[] = registrationDataError.notes.filter(
    (n) => n.id === note.noteId,
  );

  if (itemsErrors.length === 0) {
    return BLANK_STRING;
  }

  return itemsErrors[0].fieldErrors[0].errorMessage;
};

export const getSimpleErrorMessageFromRegistrationDataError = (
  itemErrors: ItemError[],
) => {
  if (!itemErrors) {
    return BLANK_STRING;
  }

  const fieldErrors: FieldError[] = itemErrors[0].fieldErrors;
  if (!fieldErrors) {
    return BLANK_STRING;
  }

  return fieldErrors[0].errorMessage;
};

export const getWorkloadCompanyErrorMessage = (
  registrationDataError: RegistrationDataError,
  workload: WorkloadData,
) => {
  if (registrationDataError.workloads.length === 0) {
    return BLANK_STRING;
  }

  const itemsErrors: ItemError[] = registrationDataError.workloads.filter(
    (w) => w.id === workload.workloadId,
  );

  if (itemsErrors.length === 0) {
    return BLANK_STRING;
  }

  const field = itemsErrors[0].fieldErrors.filter(
    (fieldError) => fieldError.field === "company",
  )[0];

  return field.errorMessage;
};

const getGroupedErrors = (
  registrationDataError: RegistrationDataError,
): Map<SectionEnum, boolean> => {
  const groupedErrors = new Map<SectionEnum, boolean>();
  groupedErrors.set(
    SectionEnum.BASIC_INFORMATION,
    areAccountErrors(registrationDataError),
  );
  groupedErrors.set(
    SectionEnum.EMPLOYMENT_INFORMATION,
    areEmploymentInformationErrors(registrationDataError),
  );
  groupedErrors.set(
    SectionEnum.WORKLOAD,
    areWorkloadErrors(registrationDataError),
  );
  groupedErrors.set(SectionEnum.NOTES, areNotesErrors(registrationDataError));
  return groupedErrors;
};

const areAccountErrors = (
  registrationDataError: RegistrationDataError,
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
  registrationDataError: RegistrationDataError,
): boolean => {
  return registrationDataError.workloads.length > 0;
};

const areEmploymentInformationErrors = (
  registrationDataError: RegistrationDataError,
): boolean => {
  return registrationDataError.supervisor !== BLANK_STRING;
};

const areNotesErrors = (
  registrationDataError: RegistrationDataError,
): boolean => registrationDataError.notes.length > 0;
