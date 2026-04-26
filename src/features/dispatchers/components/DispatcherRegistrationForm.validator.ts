import type {
  DispatcherRegistrationData,
  DispatcherRegistrationErrorData,
} from "#/types/internal/dispatcher/dispatcher-registration-types";
import {
  validateMandatoryField,
  validatePhoneNumber,
} from "#/utils/registration/registration-utils";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";
import { BLANK_STRING } from "#/constants/common/global-constants";

export const validateDispatcherRegistrationData = (
  dispatcherRegistrationData: DispatcherRegistrationData,
) => {
  const errors: DispatcherRegistrationErrorData = {};
  const nameValidation = validateMandatoryField(
    dispatcherRegistrationData.name,
    "name",
  );
  if (nameValidation !== BLANK_STRING) {
    errors.name = nameValidation;
  }

  const phoneNumberValidation = validatePhoneNumber(
    cleanPhoneNumber(dispatcherRegistrationData.phoneNumber),
    "mandatory",
    "phone number",
  );
  if (phoneNumberValidation !== BLANK_STRING) {
    errors.phoneNumber = phoneNumberValidation;
  }

  return errors;
};
