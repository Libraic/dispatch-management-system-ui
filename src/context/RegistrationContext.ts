import * as React from "react";
import { createContext } from "react";
import type {
  RegistrationDataError,
  UserRegistrationData,
} from "../types/registration/user/user-registration-data.ts";

export type RegistrationContextData = {
  registrationData: UserRegistrationData;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >;
  registrationDataError: RegistrationDataError;
};

export const RegistrationContext = createContext<
  RegistrationContextData | undefined
>(undefined);
