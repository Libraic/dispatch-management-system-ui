import type { Error } from "#/types/api/common/api-errors-types";
import axios from "axios";
import {
  DAYS_OFF_BASE_URL,
  DAYS_OFF_RELATIONS_URL,
} from "#/shared/api/constants/apiPaths.constants";
import { handleApiErrors } from "#/utils/api/api-common-error-utils";
import { toIsoDate } from "#/utils/global/date-utils";
import type { GetDispatchingDataResponse } from "#/features/planner/types/load.api.types";
import type { UpsertDayOffPeriodRequest } from "#/types/api/days-off/days-off-api-request-types";
import type {
  GetDaysOffPeriodResponse,
  UpsertDaysOffPeriodResponse,
} from "#/types/api/days-off/days-off-api-response-types";
import type { ApiResponse, NoContentResponse } from "#/shared/types/api.types";

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
