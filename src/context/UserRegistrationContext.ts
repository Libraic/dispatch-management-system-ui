import { createContext } from "react";
import type { UserRegistrationData } from "../types/internal/user/user-registration-types.ts";
import type { RegistrationContextData } from "../types/internal/context/context-types.ts";
import type { UserRegistrationErrors } from "../types/internal/user/user-registration-error-types.ts";

export const UserRegistrationContext = createContext<
  | RegistrationContextData<UserRegistrationData, UserRegistrationErrors>
  | undefined
>(undefined);
