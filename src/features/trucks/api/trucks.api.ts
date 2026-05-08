import axios from "axios";
import { TRUCKS_BASE_URL } from "#/shared/api/constants/apiPaths.constants";
import type { TruckData } from "#/types/api/truck/truck-api-response-types";
import {
  COMPANY_ID_QUERY_PARAM,
  DEFAULT_SIZE,
  JOIN_CLAUSE,
  PAGE,
  SIZE,
} from "#/shared/api/constants/apiQuery.constants";
import { COLON } from "#/constants/common/global-constants";
import type { ApiError, Page, Result } from "#/shared/types/api.types";
import { getCreateTruckRequest } from "#/utils/truck/truck-utils";
import type { TruckRegistrationData } from "#/types/internal/truck/truck-registration-types";
import { getApiError } from "#/shared/api/utils/api.utils";

export const saveTruck = async (
  truckRegistrationData: TruckRegistrationData,
  companyUuid: string,
): Promise<Result<TruckData, ApiError>> => {
  const createTruckRequest = getCreateTruckRequest(
    truckRegistrationData,
    companyUuid,
  );
  try {
    const response = await axios.post(TRUCKS_BASE_URL, createTruckRequest);
    return {
      data: response.data,
      ok: true,
    };
  } catch (error: any) {
    return getApiError(error);
  }
};

export const getTrucks = async (
  companyUuid: string,
  page?: number,
): Promise<Result<Page<TruckData>, ApiError>> => {
  try {
    const params = {
      [COMPANY_ID_QUERY_PARAM]: `${JOIN_CLAUSE}${COLON}${companyUuid}`,
      [SIZE]: DEFAULT_SIZE,
      ...(page !== undefined && { [PAGE]: page }),
    };
    const response = await axios.get(TRUCKS_BASE_URL, {
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
