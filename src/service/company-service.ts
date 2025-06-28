import axios from "axios";
import type { CompanyData } from "../types/api/registration-api.ts";
import type { ApiResponse, GroupErrorResponse } from "../types/api/common.ts";
import { SAVE_COMPANY } from "../utils/api/api-paths.ts";
import type { CreateCompanyRequest } from "../types/registration/company/company-registration-data.ts";

export const fetchCompanies = async (
  url: string,
): Promise<CompanyData[] | null> => {
  try {
    const response =
      await axios.get<ApiResponse<CompanyData[], GroupErrorResponse[]>>(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const saveCompany = async (
  createCompanyRequest: CreateCompanyRequest,
): Promise<ApiResponse<CompanyData, GroupErrorResponse[]> | undefined> => {
  try {
    const response = await axios.post(SAVE_COMPANY, createCompanyRequest);
    return response.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      return Promise.resolve(undefined);
    }

    return error.response.data;
  }
};
