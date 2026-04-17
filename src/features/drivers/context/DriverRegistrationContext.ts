import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "#/types/internal/driver/driver-registration-types";
import type { RegistrationContextData } from "#/types/internal/context/context-types";
import { createContext } from "react";

export const DriverRegistrationContext = createContext<
  | RegistrationContextData<DriverRegistrationData, DriverRegistrationError>
  | undefined
>(undefined);
