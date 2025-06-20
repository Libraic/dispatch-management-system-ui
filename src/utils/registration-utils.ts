import { BLANK_STRING, DEFAULT_BIRTH_DATE } from "./global-constants.ts";

import {
  validateEmail,
  validateNotes,
  validatePassword,
} from "./validation-utils.ts";
import type {
  CompanyData,
  CreateUserRequest,
  CreateWorkloadRequest,
  UserData,
} from "../types/api/registration-api.ts";
import { convertDateToLittleEndian } from "./util-functions.ts";
import {
  type NoteData,
  PositionEnum,
  type RegistrationData,
  type RegistrationDataError,
  RoleEnum,
  type WorkloadData,
} from "../types/registration/registration-data.ts";
import { SectionEnum } from "../types/registration/section.ts";
import type { ChangeEvent } from "react";
import * as React from "react";

export const getBlankRegistrationData = (): RegistrationData => {
  const date = new Date();
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    nickname: BLANK_STRING,
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
    supervisor: null,
    role: RoleEnum.EMPLOYEE,
    position: PositionEnum.ACCOUNTANT,
    workloads: [],
    notes: [],
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
    notesError: [],
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

  registrationDataError.notesError = validateNotes(registrationData.notes);

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

export const getCreateUserRequestFromRegistrationData = (
  registrationData: RegistrationData,
): CreateUserRequest => {
  return {
    firstName: registrationData.firstName,
    lastName: registrationData.lastName,
    nickname:
      registrationData.nickname === BLANK_STRING
        ? null
        : registrationData.nickname,
    email: registrationData.email,
    password: registrationData.password,
    personalEmail:
      registrationData.personalEmail === BLANK_STRING
        ? null
        : registrationData.personalEmail,
    birthDate: convertDateToLittleEndian(registrationData.birthDate),
    employmentDate: convertDateToLittleEndian(registrationData.employmentDate),
    role: registrationData.role,
    position: registrationData.position,
    supervisorUuid: null,
    workloads: registrationData.workloads.map(
      (workload): CreateWorkloadRequest => ({
        companyUuid: workload.companyId,
        commission: workload.commission,
      }),
    ),
    notes: registrationData.notes.map((note) => note.note),
  };
};

export const setRegistrationDataStringField = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  field: keyof RegistrationData,
  value: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

export const getFullName = (user: UserData) => {
  return user.nickname !== null
    ? `${user.firstName} "${user.nickname}" ${user.lastName}`
    : `${user.firstName} ${user.lastName}`;
};

export const alterSupervisor = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  userData: UserData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    supervisor: {
      uuid: userData.uuid,
      name: getFullName(userData),
    },
  }));
};

export const prepopulateSupervisor = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  supervisorName: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    supervisor: {
      uuid: BLANK_STRING,
      name: supervisorName,
    },
  }));
};

export const prepopulateRole = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  role: string,
) => {
  setRegistrationData((prev) => ({ ...prev, role: role }));
};

export const prepopulatePosition = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  position: string,
) => {
  setRegistrationData((prev) => ({ ...prev, position: position }));
};

export const prepopulateWorkload = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  defaultCompanyUuid: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: [
      ...prev.workloads,
      {
        workloadId: Date.now().toString(),
        companyId: defaultCompanyUuid,
        commission: 0.0,
      },
    ],
  }));
};

export const alterWorkloads = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  companies: CompanyData[],
  item: WorkloadData,
  selectedName: string,
) => {
  const selectedCompany = companies.find((c) => c.name === selectedName);
  if (selectedCompany) {
    setRegistrationData((prev) => ({
      ...prev,
      workloads: prev.workloads.map((w) =>
        w.workloadId === item.workloadId
          ? { ...w, companyId: selectedCompany.uuid }
          : w,
      ),
    }));
  }
};

export const alterWorkloadCommission = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  workloadData: WorkloadData,
  value: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.map((w) =>
      w.workloadId === workloadData.workloadId
        ? { ...w, commission: parseFloat(value) }
        : w,
    ),
  }));
};

export const deleteWorkload = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  item: WorkloadData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.filter((w) => w.workloadId !== item.workloadId),
  }));
};

export const prepopulateNote = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    notes: [
      ...prev.notes,
      {
        noteId: Date.now().toString(),
        note: BLANK_STRING,
      },
    ],
  }));
};

export const getNoteErrorMessage = (
  registrationDataError: RegistrationDataError,
  note: NoteData,
): string => {
  return (
    registrationDataError.notesError
      .filter((n) => n.noteId === note.noteId)
      .map((n) => n.errorMessage)[0] ?? { errorMessage: BLANK_STRING }
  );
};

export const alterNote = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  e: ChangeEvent<HTMLTextAreaElement>,
  noteData: NoteData,
) => {
  const value = e.target.value;
  setRegistrationData((prev) => ({
    ...prev,
    notes: prev.notes.map((note) =>
      note.noteId === noteData.noteId ? { ...note, note: value } : note,
    ),
  }));
};

export const deleteNote = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  noteData: NoteData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    notes: prev.notes.filter((n) => n.noteId !== noteData.noteId),
  }));
};

const getGroupedErrors = (
  registrationDataError: RegistrationDataError,
): Map<SectionEnum, boolean> => {
  const groupedErrors = new Map<SectionEnum, boolean>();
  groupedErrors.set(
    SectionEnum.BASIC_INFORMATION,
    areAccountErrors(registrationDataError),
  );
  groupedErrors.set(SectionEnum.EMPLOYMENT_INFORMATION, false);
  groupedErrors.set(SectionEnum.WORKLOAD, false);
  groupedErrors.set(SectionEnum.NOTES, areNotesErrors(registrationDataError));
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

const areNotesErrors = (
  registrationDataError: RegistrationDataError,
): boolean => registrationDataError.notesError.length > 0;
