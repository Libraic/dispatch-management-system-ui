import type {
  CompanyRegistrationTypes,
  CreateCompanyRequest,
} from "../../types/internal/company/company-registration-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import * as React from "react";
import {
  convertDateToLittleEndian,
  getCurrentYearData,
} from "../date/date-utils.ts";

export const getBlankCompanyRegistrationData = (): CompanyRegistrationTypes => {
  return {
    name: BLANK_STRING,
    email: BLANK_STRING,
    password: BLANK_STRING,
    confirmPassword: BLANK_STRING,
    serviceDate: getCurrentYearData(),
    startDate: getCurrentYearData(),
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
    serviceDate: convertDateToLittleEndian(companyRegistrationData.serviceDate),
    startDate: convertDateToLittleEndian(companyRegistrationData.startDate),
  };
};
