import { createContext } from "react";
import type {
  UserRegistrationData,
  UserRegistrationErrors,
} from "../types/registration/user/user-registration-data.ts";
import type { RegistrationContextData } from "../types/context/context-types.ts";

export const UserRegistrationContext = createContext<
  | RegistrationContextData<UserRegistrationData, UserRegistrationErrors>
  | undefined
>(undefined);
