import type { YearData } from "../global.ts";

export const RoleEnum = {
  EMPLOYEE: "Employee",
};

export type RoleEnum = keyof typeof RoleEnum;

export const PositionEnum = {
  ACCOUNTANT: "Accountant",
  FLATBED_DISPATCHER: "Flatbed Dispatcher",
};

export type PositionEnum = keyof typeof PositionEnum;

export type WorkloadData = {
  workloadId: string;
  companyName: string;
  companyId: string;
  commission: number;
};

export type NoteData = {
  noteId: string;
  note: string;
};

export type FieldError = {
  field: string | null;
  errorMessage: string;
};

export type ItemError = {
  id: string | null;
  fieldErrors: FieldError[];
};

export type SupervisorData = {
  uuid: string;
  name: string;
};

export type RegistrationDataError = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
  supervisor: string;
  workloads: ItemError[];
  notes: ItemError[];
};

export type RegistrationData = {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
  birthDate: YearData;
  employmentDate: YearData;
  supervisor: SupervisorData | null;
  role: string;
  position: string;
  workloads: WorkloadData[];
  notes: NoteData[];
};
