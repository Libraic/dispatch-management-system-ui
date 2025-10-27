import type { YearData } from "../date/date-types.ts";

export const USER_REGISTRATION_SECTIONS = {
  BASIC_INFORMATION: "BASIC_INFORMATION",
  CONTACT_INFORMATION: "CONTACT_INFORMATION",
  EMPLOYMENT_INFORMATION: "EMPLOYMENT_INFORMATION",
  WORKLOAD: "WORKLOAD",
  NOTES: "NOTES",
} as const;

export const RoleEnum = {
  EMPLOYEE: "Employee",
};

export type RoleEnum = keyof typeof RoleEnum;

export const PositionEnum = {
  ACCOUNTANT: "Accountant",
  FLATBED_DISPATCHER: "Flatbed Dispatcher",
};

export type PositionEnum = keyof typeof PositionEnum;

export type WorkloadRegistrationData = {
  workloadId: string;
  companyName: string;
  companyId: string;
  commission: number;
};

export type NoteRegistrationData = {
  noteId: string;
  note: string;
};

export type SupervisorRegistrationData = {
  uuid: string;
  name: string;
};

export type EmergencyContactRegistrationData = {
  name: string;
  relationship: string;
  phone: string;
};

export type UserRegistrationData = {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
  birthDate: YearData;
  emergencyContact: EmergencyContactRegistrationData;
  employmentDate: YearData;
  supervisor: SupervisorRegistrationData | null;
  role: string;
  position: string;
  workloads: WorkloadRegistrationData[];
  notes: NoteRegistrationData[];
};
