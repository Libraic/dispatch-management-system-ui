import axios from "axios";
import {
  LOADS_BASE_URL,
  LOADS_COMPANIES_URL,
  LOADS_RELATIONS_URL,
} from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import {
  END_DATE_QUERY_PARAM,
  START_DATE_QUERY_PARAM,
} from "../constants/api/api-query-constants.ts";
import type {
  ApiResponse,
  NoContentResponse,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import type {
  GetDriverLoadsResponse,
  LoadResponse,
  UpsertLoadRequest,
  UpsertLoadResponse,
} from "../types/api/loads/load-api-types.ts";
import { toIsoDate } from "../utils/global/date-utils.ts";

export const upsertLoad = async (
  upsertLoadRequest: UpsertLoadRequest,
): Promise<ApiResponse<UpsertLoadResponse, Error>> => {
  try {
    const response = await axios.put(LOADS_BASE_URL, upsertLoadRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const getLoadsByCompanyUuidAndStartAndEndDate = async (
  companyUuid: string,
  week: string[],
): Promise<ApiResponse<GetDriverLoadsResponse[], Error>> => {
  const startDate = week[0];
  const endDateObject = new Date(week[week.length - 1]);
  endDateObject.setDate(endDateObject.getDate() + 7);
  const endDate = toIsoDate(endDateObject);
  try {
    const response = await axios.get<
      ApiResponse<GetDriverLoadsResponse[], Error>
    >(LOADS_COMPANIES_URL + `/${companyUuid}`, {
      params: {
        [START_DATE_QUERY_PARAM]: startDate,
        [END_DATE_QUERY_PARAM]: endDate,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const getLoadData = async (
  loadUuid: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResponse<LoadResponse[], Error>> => {
  const url = LOADS_RELATIONS_URL + `/${loadUuid}`;
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

export const deleteLoadByUuid = async (
  loadUuid: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  try {
    const response = await axios.delete<
      ApiResponse<GetDriverLoadsResponse[], Error>
    >(LOADS_BASE_URL + `/${loadUuid}`);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
