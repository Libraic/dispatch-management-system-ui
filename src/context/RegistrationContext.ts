import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/authentication.ts";
import type { CompanyData } from "../types/api-types.ts";
import type { Pagination } from "../types/global.ts";
import * as React from "react";
import { createContext } from "react";

export type RegistrationContextData = {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  registrationDataError: RegistrationDataError;
  companies: CompanyData[];
  pagination?: Pagination;
};

export const RegistrationContext = createContext<
  RegistrationContextData | undefined
>(undefined);
