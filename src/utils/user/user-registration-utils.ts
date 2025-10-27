import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import {
  convertDateToLittleEndian,
  getCurrentYearData,
} from "../date/date-utils.ts";
import {
  type EmergencyContactRegistrationData,
  type NoteRegistrationData,
  PositionEnum,
  RoleEnum,
  type UserRegistrationData,
  type WorkloadRegistrationData,
} from "../../types/internal/user/user-registration-types.ts";
import type { ChangeEvent } from "react";
import * as React from "react";
import type { Renderable } from "../../types/internal/classes/Renderable.ts";
import type {
  CreateUserRequest,
  CreateWorkloadRequest,
  EmergencyContact,
} from "../../types/api/user/user-api-request-types.ts";
import { DEFAULT_BIRTH_DATE } from "../../constants/date/date-constants.ts";

export const getBlankUserRegistrationData = (): UserRegistrationData => {
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    nickname: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    personalEmail: BLANK_STRING,
    birthDate: DEFAULT_BIRTH_DATE,
    emergencyContact: getBlankEmergencyContactData(),
    employmentDate: getCurrentYearData(),
    supervisor: null,
    role: RoleEnum.EMPLOYEE,
    position: PositionEnum.ACCOUNTANT,
    workloads: [],
    notes: [],
  };
};

export const getCreateUserRequestFromRegistrationData = (
  registrationData: UserRegistrationData,
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
    emergencyContact: createEmergencyContactFromEmergencyContactData(
      registrationData.emergencyContact,
    ),
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
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  field: keyof UserRegistrationData,
  value: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

export const setEmergencyContactField = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  field: keyof EmergencyContactRegistrationData,
  value: string,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    emergencyContact: {
      ...prev.emergencyContact,
      [field]: value,
    },
  }));
};

export const alterSupervisor = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  userData: Renderable,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    supervisor: {
      uuid: userData.getUuid(),
      name: userData.renderOnList(),
    },
  }));
};

export const cleanSupervisor = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    supervisor: {
      uuid: BLANK_STRING,
      name: BLANK_STRING,
    },
  }));
};

export const prepopulateRole = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  role: string,
) => {
  setRegistrationData((prev) => ({ ...prev, role: role }));
};

export const prepopulatePosition = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  position: string,
) => {
  setRegistrationData((prev) => ({ ...prev, position: position }));
};

export const prepopulateWorkload = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
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

export const alterWorkloads = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  companyData: Renderable,
  workloadData: WorkloadRegistrationData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.map((w) =>
      w.workloadId === workloadData.workloadId
        ? {
            ...w,
            companyId: companyData.getUuid(),
            companyName: companyData.renderOnList(),
          }
        : w,
    ),
  }));
};

export const cleanWorkload = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  workloadData: WorkloadRegistrationData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.map((w) =>
      w.workloadId === workloadData.workloadId
        ? {
            ...w,
            companyId: BLANK_STRING,
            companyName: BLANK_STRING,
          }
        : w,
    ),
  }));
};

export const alterWorkloadCommission = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  workloadData: WorkloadRegistrationData,
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
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  item: WorkloadRegistrationData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    workloads: prev.workloads.filter((w) => w.workloadId !== item.workloadId),
  }));
};

export const prepopulateNote = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
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

export const alterNote = (
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  e: ChangeEvent<HTMLTextAreaElement>,
  noteData: NoteRegistrationData,
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
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >,
  noteData: NoteRegistrationData,
) => {
  setRegistrationData((prev) => ({
    ...prev,
    notes: prev.notes.filter((n) => n.noteId !== noteData.noteId),
  }));
};

const getBlankEmergencyContactData = (): EmergencyContactRegistrationData => {
  return {
    name: BLANK_STRING,
    relationship: BLANK_STRING,
    phone: BLANK_STRING,
  };
};

const createEmergencyContactFromEmergencyContactData = (
  emergencyContactData: EmergencyContactRegistrationData,
): EmergencyContact | null => {
  const name = emergencyContactData.name;
  const relationship = emergencyContactData.relationship;
  const phone = emergencyContactData.phone;
  if (!name && !relationship && !phone) {
    return null;
  }

  return {
    name: name === BLANK_STRING ? null : name,
    relationship: relationship === BLANK_STRING ? null : relationship,
    phone: phone === BLANK_STRING ? null : phone,
  };
};
