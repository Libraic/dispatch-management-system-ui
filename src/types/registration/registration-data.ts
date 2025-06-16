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
  companyId: string;
  commission: number;
};

export type NoteData = {
  noteId: string;
  note: string;
};

export type NoteError = {
  noteId: string;
  errorMessage: string;
};

export type RegistrationDataError = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  personalEmailError: string;
  notesError: NoteError[];
};

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalEmail: string;
  birthDate: YearData;
  employmentDate: YearData;
  role: string;
  position: string;
  workload: WorkloadData[];
  notes: NoteData[];
};
