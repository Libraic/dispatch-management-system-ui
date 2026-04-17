import type {
  CompanyRegistrationTypes,
  CreateCompanyRequest,
} from "#/types/internal/company/company-registration-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import * as React from "react";
import { toIsoDate } from "#/utils/global/date-utils";

export const getBlankCompanyRegistrationData = (): CompanyRegistrationTypes => {
  return {
    name: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    serviceDate: new Date(),
    startDate: new Date(),
  };
};

export const setCompanyStringField = (
  setCompanyRegistrationData: React.Dispatch<
    React.SetStateAction<CompanyRegistrationTypes>
  >,
  fieldName: keyof CompanyRegistrationTypes,
  fieldValue: string,
) => {
  setCompanyRegistrationData((prev) => ({
    ...prev,
    [fieldName]: fieldValue,
  }));
};

export const createCreateCompanyRequestFromCompanyRegistrationData = (
  companyRegistrationData: CompanyRegistrationTypes,
): CreateCompanyRequest => {
  return {
    name: companyRegistrationData.name,
    password: companyRegistrationData.password,
    email: companyRegistrationData.email,
    mcNumber: companyRegistrationData.mcNumber ?? null,
    address: companyRegistrationData.address ?? null,
    serviceDate: toIsoDate(companyRegistrationData.serviceDate),
    startDate: toIsoDate(companyRegistrationData.startDate),
  };
};
