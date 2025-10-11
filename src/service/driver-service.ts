import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../types/api/common.ts";
import axios from "axios";
import { DRIVERS_BASE_URL } from "../utils/api/api-paths.ts";
import type {
  CreateDriverRequest,
  DriverData,
} from "../types/api/driver-api.ts";
import { handleApiErrors } from "../utils/api/common-api-error-utils.ts";
import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
  SIZE,
} from "../utils/api/api-query-constants.ts";
import { COLON } from "../utils/constants/global-constants.ts";

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
): Promise<DriverData[]> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: 10,
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
