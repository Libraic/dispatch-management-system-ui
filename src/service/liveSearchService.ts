import axios from "axios";
import type { ApiResponse } from "../types/api/common.ts";

export const getData = async <T>(
  endpoint: string,
  searchField: string,
  searchText: string,
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.get<ApiResponse<T>>(endpoint, {
      params: { [searchField]: `like:${searchText}` },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
