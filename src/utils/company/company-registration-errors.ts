import type {
  CompanyRegistrationTypes,
  CompanyRegistrationError,
} from "../../types/internal/company/company-registration-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import {
  validateEmail,
  validateMandatoryField,
  validatePassword,
} from "../registration/registration-utils.ts";

export const getBlankCompanyRegistrationErrors = () => {
  return {
    name: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
  };
};

export const getCompanyRegistrationErrors = (
  companyRegistrationData: CompanyRegistrationTypes,
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
