import axios from "axios";
import type { CompanyData } from "../types/api/registration-api.ts";
import type { ApiResponse, GroupErrorResponse } from "../types/api/common.ts";
import { FETCH_COMPANIES, SAVE_COMPANY } from "../utils/api/api-paths.ts";
import type { CreateCompanyRequest } from "../types/registration/company/company-registration-data.ts";

export const fetchCompanies = async (): Promise<CompanyData[] | null> => {
  try {
    const response =
      await axios.get<ApiResponse<CompanyData[], GroupErrorResponse[]>>(
        FETCH_COMPANIES,
      );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCompanyByUuid = async (
  companyUuid: string,
): Promise<CompanyData | undefined> => {
  try {
    const url = `${FETCH_COMPANIES}?uuid=eq:${companyUuid}`;
    const response =
      await axios.get<ApiResponse<CompanyData[], GroupErrorResponse[]>>(url);
    return response.data.data ? response.data.data[0] : undefined;
  } catch (error: any) {
    if (error.status === 500 || error.code === "ERR_NETWORK") {
      return Promise.resolve(undefined);
    }

    return error.response.data;
  }
};

export const saveCompany = async (
  createCompanyRequest: CreateCompanyRequest,
): Promise<ApiResponse<CompanyData, GroupErrorResponse[]> | undefined> => {
  try {
    const response = await axios.post(SAVE_COMPANY, createCompanyRequest);
    return response.data;
  } catch (error: any) {
    if (error.status === 500 || error.code === "ERR_NETWORK") {
      return Promise.resolve(undefined);
    }

    return error.response.data;
  }
};
