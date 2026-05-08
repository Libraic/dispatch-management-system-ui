import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "#/types/internal/company/company-registration-data";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  validateEmail,
  validateMandatoryField,
  validatePassword,
} from "#/utils/registration/registration-utils";

export const getBlankCompanyRegistrationErrors = () => {
  return {
    name: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
  };
};

export const getCompanyRegistrationErrors = (
  companyRegistrationData: CompanyRegistrationData,
): CompanyRegistrationError => {
  const errors: CompanyRegistrationError = getBlankCompanyRegistrationErrors();

  errors.name = validateMandatoryField(
    companyRegistrationData.name,
    "Company name",
  );
  errors.email = validateEmail(companyRegistrationData.email, true);
  errors.password = validatePassword(
    companyRegistrationData.password,
    companyRegistrationData.confirmPassword,
  );

  return errors;
};
