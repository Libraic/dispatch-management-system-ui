import axios from "axios";
import type { ApiResponse, GetCompaniesResponse } from "../types/api-types.ts";

export const fetchCompanies = async (url: string) => {
  try {
    const response = await axios.get<ApiResponse<GetCompaniesResponse>>(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
