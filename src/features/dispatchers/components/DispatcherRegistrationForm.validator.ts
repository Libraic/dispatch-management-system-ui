import type {
  DispatcherRegistrationData,
  DispatcherRegistrationErrorData,
} from "#/types/internal/dispatcher/dispatcher-registration-types";
import {
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";

export const validateDispatcherRegistrationData = (
  dispatcherRegistrationData: DispatcherRegistrationData,
) => {
  const errors: DispatcherRegistrationErrorData = {};
  const nameValidation = validateMandatoryField(
    dispatcherRegistrationData.name,
    "name",
  );
  if (nameValidation) {
    errors.name = nameValidation;
  }

  const phoneNumberValidation = validatePhoneNumber(
    cleanPhoneNumber(dispatcherRegistrationData.phoneNumber),
    "mandatory",
    "phone number",
  );
  if (phoneNumberValidation) {
    errors.phoneNumber = phoneNumberValidation;
  }

  return errors;
};
