import type {
  ApiError,
  NoContentResponse,
  Page,
  Result,
} from "#/shared/types/api.types";
import axios from "axios";
import { DRIVERS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import { getApiError } from "#/shared/api/utils/api.utils";
import { createCreateDriverRequestFromDriverRegistrationData } from "#/utils/driver/driver-registration-utils";
import type { DriverRegistrationData } from "#/types/internal/driver/driver-registration-types";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";
import {
  COMPANY_ID_QUERY_PARAM,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import { DEFAULT_PAGE_SIZE } from "#/shared/api/constants/api.constants";

export const saveDriver = async (
  driverRegistrationData: DriverRegistrationData,
  companyId: string,
): Promise<Result<DriverData, ApiError>> => {
  const createDriverRequest =
    createCreateDriverRequestFromDriverRegistrationData(
      driverRegistrationData,
      companyId,
    );

  try {
    const response = await axios.post(DRIVERS_BASE_URL, createDriverRequest);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const getDrivers = async (
  companyUuid: string,
  page?: number,
): Promise<Result<Page<DriverData>, ApiError>> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_PAGE_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get(DRIVERS_BASE_URL, {
      params: params,
    });
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const deleteDriverById = async (
  driverId: string,
): Promise<Result<NoContentResponse, ApiError>> => {
  try {
    const response = await axios.delete(DRIVERS_BASE_URL + `/${driverId}`);
    return {
      ok: true,
      data: response.data,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};
