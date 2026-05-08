import type { CompanyRegistrationError } from "#/types/internal/company/company-registration-data";
import { BLANK_STRING } from "#/constants/common/global-constants";

export const validateCompanyRegistration = (
  companyRegistrationErrors: CompanyRegistrationError,
) => {
  return companyRegistrationErrors.name !== BLANK_STRING;
};
