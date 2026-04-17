import axios from "axios";
import { TRAILERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import type { CreateTrailerRequest } from "#/types/api/trailer/trailer-api-request-types";
import type { TrailerData } from "#/types/api/trailer/trailer-api-response-types";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import type { ApiResponse } from "#/shared/types/api.types";

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
