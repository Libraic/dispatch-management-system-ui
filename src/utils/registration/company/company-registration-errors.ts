import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "../../../types/registration/company/company-registration-data.ts";
import { BLANK_STRING } from "../../constants/global.ts";

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

export const areErrors = (
  companyRegistrationErrors: CompanyRegistrationError,
) => {
  return companyRegistrationErrors.name !== BLANK_STRING;
};
