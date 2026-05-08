import { createContext } from "react";
import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "#/types/internal/company/company-registration-data";
import type { RegistrationContextData } from "#/features/drivers/context/context.types";

export const CompanyRegistrationContext = createContext<
  | RegistrationContextData<CompanyRegistrationData, CompanyRegistrationError>
  | undefined
>(undefined);
