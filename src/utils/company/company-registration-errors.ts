import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "#/types/internal/company/company-registration-data";
import {
  validateEmail,
  validateMandatoryField,
  validatePassword,
} from "#/utils/registration/registration-utils";

export const getCompanyRegistrationErrors = (
  companyRegistrationData: CompanyRegistrationData,
): CompanyRegistrationError => {
  const errors: CompanyRegistrationError = {};

  const nameValidationResult = validateMandatoryField(
    companyRegistrationData.name,
    "Company name",
  );
  if (nameValidationResult) {
    errors.name = nameValidationResult;
  }

  const emailValidationResult = validateEmail(
    companyRegistrationData.email,
    true,
  );
  if (emailValidationResult) {
    errors.email = emailValidationResult;
  }

  const passwordValidationResult = validatePassword(
    companyRegistrationData.password,
    companyRegistrationData.confirmPassword,
  );
  if (passwordValidationResult) {
    errors.password = passwordValidationResult;
  }

  return errors;
};
