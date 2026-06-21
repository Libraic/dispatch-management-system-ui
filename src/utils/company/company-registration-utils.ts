import type {
  CompanyRegistrationData,
  CreateCompanyRequest,
} from "#/types/internal/company/company-registration-data";
import { BLANK_STRING } from "#/constants/common/global-constants";
import * as React from "react";
import { getCurrentDay } from "#/utils/global/date-utils";
import { DEFAULT_TIMEZONE_DATA } from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings.constants";

export const getBlankCompanyRegistrationData = (): CompanyRegistrationData => {
  return {
    name: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    serviceDate: getCurrentDay(),
    startDate: getCurrentDay(),
  };
};

export const setCompanyStringField = (
  setCompanyRegistrationData: React.Dispatch<
    React.SetStateAction<CompanyRegistrationData>
  >,
  fieldName: keyof CompanyRegistrationData,
  fieldValue: string,
) => {
  setCompanyRegistrationData((prev) => ({
    ...prev,
    [fieldName]: fieldValue,
  }));
};

export const createCreateCompanyRequestFromCompanyRegistrationData = (
  companyRegistrationData: CompanyRegistrationData,
  invitationToken?: string,
): CreateCompanyRequest => {
  return {
    name: companyRegistrationData.name,
    password: companyRegistrationData.password,
    email: companyRegistrationData.email,
    mcNumber: companyRegistrationData.mcNumber ?? null,
    address: companyRegistrationData.address ?? null,
    serviceDate: companyRegistrationData.serviceDate,
    startDate: companyRegistrationData.startDate,
    timezone: DEFAULT_TIMEZONE_DATA.value,
    invitationToken,
  };
};
