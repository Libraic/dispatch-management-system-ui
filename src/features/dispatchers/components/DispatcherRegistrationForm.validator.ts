import type {
  DispatcherRegistrationData,
  DispatcherRegistrationErrorData,
} from "#/types/internal/dispatcher/dispatcher-registration-types";
import {
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";
import { cleanPhoneNumber } from "#/shared/utils/inputField.formatter";

export const validateDispatcherRegistrationData = (
  dispatcherRegistrationData: DispatcherRegistrationData,
) => {
  const errors: DispatcherRegistrationErrorData = {};
  errors.name = validateMandatoryField(dispatcherRegistrationData.name, "name");

  errors.phoneNumber = validatePhoneNumber(
    cleanPhoneNumber(dispatcherRegistrationData.phoneNumber),
    "mandatory",
    "phone number",
  );
  return errors;
};
