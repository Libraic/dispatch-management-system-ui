import { createContext } from "react";
import type { RegistrationContextData } from "../types/internal/context/context-types.ts";
import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "../types/internal/driver/driver-registration-types.ts";

export const DriverRegistrationContext = createContext<
  | RegistrationContextData<DriverRegistrationData, DriverRegistrationError>
  | undefined
>(undefined);
