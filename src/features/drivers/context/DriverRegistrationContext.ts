import type {
  DriverRegistrationData,
  DriverRegistrationError,
} from "#/types/internal/driver/driver-registration-types";
import { createContext } from "react";
import type { RegistrationContextData } from "#/features/drivers/context/context.types";

export const DriverRegistrationContext = createContext<
  | RegistrationContextData<DriverRegistrationData, DriverRegistrationError>
  | undefined
>(undefined);
