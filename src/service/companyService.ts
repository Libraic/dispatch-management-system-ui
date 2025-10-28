import axios from "axios";
import { COMPANIES_BASE_URL } from "../constants/api/api-paths.ts";
import type { CreateCompanyRequest } from "../types/internal/company/company-registration-data.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type { CompanyData } from "../types/api/company/company-api-response-types.ts";

export const fetchCompanies = async (): Promise<CompanyData[] | undefined> => {
  try {
    const response =
      await axios.get<ApiResponse<CompanyData[], GroupsErrorResponse>>(
        COMPANIES_BASE_URL,
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
    const url = `${COMPANIES_BASE_URL}?uuid=eq:${companyUuid}`;
    const response =
      await axios.get<ApiResponse<CompanyData[], GroupsErrorResponse>>(url);
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
): Promise<ApiResponse<CompanyData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(COMPANIES_BASE_URL, createCompanyRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors();
  }
};
