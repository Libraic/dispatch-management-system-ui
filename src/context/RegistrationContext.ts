import type { RegistrationData } from "../types/authentication.ts";
import type { CompanyData } from "../types/api-types.ts";
import type { Pagination } from "../types/global.ts";
import { createContext } from "react";
import * as React from "react";

export type RegistrationContextData = {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  companies: CompanyData[];
  pagination?: Pagination;
};

export const RegistrationContext = createContext<
  RegistrationContextData | undefined
>(undefined);
