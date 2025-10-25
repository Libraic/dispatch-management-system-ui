import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { TRUCKS_BASE_URL } from "../utils/api/api-paths.ts";
import type {
  CreateTruckRequest,
  TruckData,
} from "../types/assets/trailer-data.ts";

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
