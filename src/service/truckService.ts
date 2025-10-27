import axios from "axios";
import { TRUCKS_BASE_URL } from "../constants/api/api-paths.ts";
import type { CreateTruckRequest } from "../types/api/truck/truck-api-request-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type { TruckData } from "../types/api/truck/truck-api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";

export const saveTruck = async (
  createTruckRequest: CreateTruckRequest,
): Promise<ApiResponse<TruckData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(TRUCKS_BASE_URL, createTruckRequest);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
