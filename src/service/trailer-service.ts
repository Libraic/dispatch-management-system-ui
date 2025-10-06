import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { TRAILERS_BASE_URL } from "../utils/api/api-paths.ts";
import type {
  CreateTrailerRequest,
  TrailerData,
} from "../types/assets/asset-data.ts";

export const saveTrailer = async (
  createTrailerRequest: CreateTrailerRequest,
): Promise<ApiResponse<TrailerData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(TRAILERS_BASE_URL, createTrailerRequest);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
