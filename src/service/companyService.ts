import axios from "axios";
import type { GetCompaniesResponse } from "../types/api/registration-api.ts";
import type { ApiResponse } from "../types/api/common.ts";

export const fetchCompanies = async (url: string) => {
  try {
    const response = await axios.get<ApiResponse<GetCompaniesResponse>>(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
