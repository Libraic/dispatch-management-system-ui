import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "../../types/internal/company/company-registration-data.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const getBlankCompanyRegistrationErrors = () => {
  return {
    name: BLANK_STRING,
  };
};

export const getCompanyRegistrationErrors = (
  companyRegistrationData: CompanyRegistrationData,
): CompanyRegistrationError => {
  const errors: CompanyRegistrationError = getBlankCompanyRegistrationErrors();

  if (companyRegistrationData.name === BLANK_STRING) {
    errors.name = "The company name is required";
  }

  return errors;
};
