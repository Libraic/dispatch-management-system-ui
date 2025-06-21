import axios from "axios";
import type {
  ApiResponse,
  Error,
  GroupErrorResponse,
} from "../types/api/common.ts";

export const getData = async <T, E extends Error | GroupErrorResponse[]>(
  endpoint: string,
  searchField: string,
  searchText: string,
): Promise<ApiResponse<T, E>> => {
  try {
    const response = await axios.get<ApiResponse<T, E>>(endpoint, {
      params: { [searchField]: `like:${searchText}` },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};
