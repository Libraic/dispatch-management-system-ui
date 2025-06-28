import type {
  CompanyRegistrationData,
  CreateCompanyRequest,
} from "../../../types/registration/company/company-registration-data.ts";
import { BLANK_STRING } from "../../constants/global.ts";
import * as React from "react";
import { convertDateToLittleEndian, getCurrentYearData } from "../../date.ts";

export const getBlankCompanyRegistrationData = (): CompanyRegistrationData => {
  return {
    name: BLANK_STRING,
    serviceDate: getCurrentYearData(),
    startDate: getCurrentYearData(),
  };
};

export const alterCompanySimpleField = (
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
): CreateCompanyRequest => {
  return {
    name: companyRegistrationData.name,
    mcNumber: companyRegistrationData.mcNumber ?? null,
    address: companyRegistrationData.address ?? null,
    serviceDate: convertDateToLittleEndian(companyRegistrationData.serviceDate),
    startDate: convertDateToLittleEndian(companyRegistrationData.startDate),
  };
};
