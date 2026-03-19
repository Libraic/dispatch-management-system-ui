import type {
  ApiResponse,
  NoContentResponse,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import axios from "axios";
import {
  DAYS_OFF_BASE_URL,
  DAYS_OFF_RELATIONS_URL,
} from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import { toIsoDate } from "../utils/global/date-utils.ts";
import type { GetDispatchingDataResponse } from "../types/api/loads/load-api-types.ts";
import type { UpsertDayOffPeriodRequest } from "../types/api/days-off/days-off-api-request-types.ts";
import type {
  GetDaysOffPeriodResponse,
  UpsertDaysOffPeriodResponse,
} from "../types/api/days-off/days-off-api-response-types.ts";

export const upsertDaysOffPeriod = async (
  request: UpsertDayOffPeriodRequest,
): Promise<ApiResponse<UpsertDaysOffPeriodResponse, Error>> => {
  try {
    const response = await axios.put(DAYS_OFF_BASE_URL, request);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const getDaysOffPeriodData = async (
  relationId: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResponse<GetDaysOffPeriodResponse[], Error>> => {
  const url = DAYS_OFF_RELATIONS_URL + `/${relationId}`;
  const params = {
    startDate: toIsoDate(startDate),
    endDate: toIsoDate(endDate),
  };
  try {
    const response = await axios.get(url, {
      params: params,
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const deleteDaysOffPeriodByUuid = async (
  daysOffPeriodUuid: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  try {
    const response = await axios.delete<
      ApiResponse<GetDispatchingDataResponse[], Error>
    >(DAYS_OFF_BASE_URL + `/${daysOffPeriodUuid}`);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
