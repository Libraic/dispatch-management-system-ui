import { createContext } from "react";
import type { RegistrationContextData } from "#/types/internal/context/context-types";
import type {
  CompanyRegistrationTypes,
  CompanyRegistrationError,
} from "#/types/internal/company/company-registration-types";

export const CompanyRegistrationContext = createContext<
  | RegistrationContextData<CompanyRegistrationTypes, CompanyRegistrationError>
  | undefined
>(undefined);
