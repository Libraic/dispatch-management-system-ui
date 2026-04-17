import axios from "axios";
import { DRIVERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import type { CreateDriverRequest } from "#/types/api/driver/driver-api-request-types";
import { handleApiErrors } from "#/utils/api/api-common-error-utils";
import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";
import type {
  Error,
  GroupsErrorResponse,
} from "#/types/api/common/api-errors-types";
import { DRIVERS_PAGE_SIZE } from "#/constants/driver/drivers-table-constants";
import type { ApiResponse } from "#/shared/types/api.types";

export const saveDriver = async (
  createDriverRequest: CreateDriverRequest,
): Promise<ApiResponse<DriverData, Error | GroupsErrorResponse>> => {
  try {
    const response = await axios.post(DRIVERS_BASE_URL, createDriverRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const getDrivers = async (
  companyUuid: string,
  page?: number,
): Promise<DriverData[]> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DRIVERS_PAGE_SIZE,
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
  } catch {
    return [];
  }
};
