import type { CompanyRegistrationError } from "../../types/internal/company/company-registration-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const validateCompanyRegistration = (
  companyRegistrationErrors: CompanyRegistrationError,
) => {
  return companyRegistrationErrors.name !== BLANK_STRING;
};
