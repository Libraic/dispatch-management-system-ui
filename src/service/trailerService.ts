import axios from "axios";
import { TRAILERS_BASE_URL } from "../constants/api/api-paths.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type { CreateTrailerRequest } from "../types/api/trailer/trailer-api-request-types.ts";
import type { TrailerData } from "../types/api/trailer/trailer-api-response-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";

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
