import type { YearData } from "./global.ts";
import { type ReactNode } from "react";

export type WorkloadData = {
  workloadId: string;
  companyId: string;
  commission: number;
};

export type NoteData = {
  noteId: string;
  note: string;
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

export type SelectFormData<T extends ReactNode, D extends string | number> = {
  label: string;
  formWidth: string;
  initialValue: D;
  data: T[];
  setElement: (value: string) => void;
};

export const SectionEnum = {
  BASIC_INFORMATION: "BASIC_INFORMATION",
  EMPLOYMENT_INFORMATION: "EMPLOYMENT_INFORMATION",
  WORKLOAD: "WORKLOAD",
  NOTES: "NOTES",
} as const;

export type SectionEnum = keyof typeof SectionEnum;

export type SectionData = {
  next: () => void;
  setErrors: (sectionsWithErrors: SectionEnum[]) => void;
  removeError: (sectionEnum: SectionEnum) => void;
  isSectionWithErrors: (sectionEnum: SectionEnum) => boolean;
  setFocusedSection: (sectionEnum: SectionEnum) => void;
  getActiveSection: () => SectionEnum;
  isSectionComplete: (sectionEnum: SectionEnum) => boolean;
  isSectionActive: (sectionEnum: SectionEnum) => boolean;
  isSectionFocused: (sectionEnum: SectionEnum) => boolean;
};

export const RoleEnum = {
  EMPLOYEE: "Employee",
};

export type RoleEnum = keyof typeof RoleEnum;

export const PositionEnum = {
  ACCOUNTANT: "Accountant",
  FLATBED_DISPATCHER: "Flatbed Dispatcher",
};

export type PositionEnum = keyof typeof PositionEnum;
