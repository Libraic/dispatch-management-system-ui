import * as React from "react";
import { createContext } from "react";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/registration/registration-data.ts";

export type RegistrationContextData = {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  registrationDataError: RegistrationDataError;
};

export const RegistrationContext = createContext<
  RegistrationContextData | undefined
>(undefined);
