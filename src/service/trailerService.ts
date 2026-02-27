import axios from "axios";
import { TRAILERS_BASE_URL } from "../constants/api/api-paths.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";
import type { CreateTrailerRequest } from "../types/api/trailer/trailer-api-request-types.ts";
import type { TrailerData } from "../types/api/trailer/trailer-api-response-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "../constants/api/api-query-constants.ts";
import { COLON } from "../constants/common/global-constants.ts";

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

export const getTrailers = async (
  companyUuid: string,
  page?: number,
): Promise<TrailerData[]> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get<ApiResponse<TrailerData[], Error>>(
      TRAILERS_BASE_URL,
      {
        params: params,
      },
    );
    const data = response.data.data;
    return data ? data : [];
  } catch {
    return [];
  }
};
