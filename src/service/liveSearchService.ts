import axios from "axios";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";

export const getData = async <T, E extends Error | GroupsErrorResponse>(
  endpoint: string,
  params: any,
): Promise<ApiResponse<T, E>> => {
  try {
    const response = await axios.get<ApiResponse<T, E>>(endpoint, {
      params: params,
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
