import axios from "axios";
import { TRUCKS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import type { CreateTruckRequest } from "#/types/api/truck/truck-api-request-types";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import type { ApiResponse } from "#/shared/types/api.types";

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

export const getTrucks = async (
  companyUuid: string,
  page?: number,
): Promise<TruckData[]> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get<ApiResponse<TruckData[], Error>>(
      TRUCKS_BASE_URL,
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
