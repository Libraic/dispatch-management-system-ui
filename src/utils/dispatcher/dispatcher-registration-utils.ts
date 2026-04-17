import type {
  DispatcherRegistrationData,
  DispatcherRegistrationErrorData,
} from "#/types/internal/dispatcher/dispatcher-registration-types";
import { BLANK_STRING } from "#/constants/common/global-constants";

export const getBlankDispatcherRegistrationData =
  (): DispatcherRegistrationData => {
    return {
      name: BLANK_STRING,
      phoneNumber: BLANK_STRING,
    };
  };

export const getBlankDispatcherRegistrationErrorData =
  (): DispatcherRegistrationErrorData => {
    return {
      name: BLANK_STRING,
      phoneNumber: BLANK_STRING,
    };
  };
