import axios from "axios";
import { DRIVERS_BASE_URL } from "../constants/api/api-paths.ts";
import type { CreateDriverRequest } from "../types/api/driver/driver-api-request-types.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "../constants/api/api-query-constants.ts";
import { COLON } from "../constants/common/global-constants.ts";
import type { DriverData } from "../types/api/driver/driver-api-response-types.ts";
import type { ApiResponse } from "../types/api/common/api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../types/api/common/api-errors-types.ts";

export const saveDriver = async (
  createDriverRequest: CreateDriverRequest,
): Promise<ApiResponse<DriverData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(DRIVERS_BASE_URL, createDriverRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors();
  }
};

export const getDrivers = async (
  companyUuid: string,
  page?: number,
): Promise<DriverData[]> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get<ApiResponse<DriverData[], Error>>(
      DRIVERS_BASE_URL,
      {
        params: params,
      },
    );
    const data = response.data.data;
    return data ? data : [];
  } catch (error: any) {
    return [];
  }
};
