import type { CompanyData } from "../types/api/registration-api.ts";
import type { Pagination } from "../types/global.ts";
import * as React from "react";
import { createContext } from "react";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/registration/registration-data.ts";
import type { Error } from "../types/api/common.ts";

export type RegistrationContextData = {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  registrationDataError: RegistrationDataError;
  companies: CompanyData[];
  pagination?: Pagination;
  error: Error | undefined;
};

export const RegistrationContext = createContext<
  RegistrationContextData | undefined
>(undefined);
