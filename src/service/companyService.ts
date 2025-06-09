import axios from "axios";
import { FETCH_ALL_COMPANIES } from "../utils/api-paths.ts";
import type { ApiResponse, CompanyData } from "../types/api-types.ts";

export const fetchCompanies = async () => {
  try {
    const response =
      await axios.get<ApiResponse<CompanyData[]>>(FETCH_ALL_COMPANIES);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    throw error;
  }
};
