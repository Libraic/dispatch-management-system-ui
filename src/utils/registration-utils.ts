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
  type ItemError,
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
  registrationData: RegistrationData,
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
    supervisor: {
      uuid: registrationData.supervisor?.uuid ?? null,
      fullName: registrationData.supervisor?.name ?? null,
    },
    workloads: registrationData.workloads.map(
      (workload): CreateWorkloadRequest => ({
        companyUuid: workload.companyId,
        companyName: workload.companyName,
        itemIdentifier: workload.workloadId,
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
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: [
      ...prev.workloads,
      {
        workloadId: Date.now().toString(),
        companyId: BLANK_STRING,
        companyName: BLANK_STRING,
        commission: 0.0,
      },
    ],
  }));
};

export const prepopulateCompanyName = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  companyName: string,
  workloadData: WorkloadData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.map((workload) =>
      workload.workloadId === workloadData.workloadId
        ? { ...workload, companyName }
        : workload,
    ),
  }));
};

export const alterWorkloads = (
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>,
  companyData: CompanyData,
  workloadData: WorkloadData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.map((w) =>
      w.workloadId === workloadData.workloadId
        ? {
            ...w,
            companyId: companyData.uuid,
            companyName: companyData.name,
          }
        : w,
    ),
  }));
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
