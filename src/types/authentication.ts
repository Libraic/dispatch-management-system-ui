import type { YearData } from "./global.ts";
import { type ReactNode } from "react";

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
};

export type RegistrationDataError = {
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  personalEmailError: string;
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
  setError: (sectionEnum: SectionEnum) => void;
  isSectionWithErrors: (sectionEnum: SectionEnum) => boolean;
  setFocusedSection: (sectionEnum: SectionEnum) => void;
  getActiveSection: () => SectionEnum;
  isSectionComplete: (sectionEnum: SectionEnum) => boolean;
  isSectionActive: (sectionEnum: SectionEnum) => boolean;
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
