import axios from "axios";
import { LOADS_BASE_URL } from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import {
  COMPANY_ID_QUERY_PARAM,
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
  const endDate = week[week.length - 1];
  try {
    const response = await axios.get<
      ApiResponse<GetDriverLoadsResponse[], Error>
    >(LOADS_BASE_URL, {
      params: {
        [COMPANY_ID_QUERY_PARAM]: companyUuid,
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
): Promise<ApiResponse<LoadResponse[], Error>> => {
  const url = LOADS_BASE_URL + `/${loadUuid}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};

export const deleteLoadDataBetweenDates = async (
  loadUuid: string,
  idAcrossTimeframe: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  const params = {
    load: loadUuid,
    idAcrossTimeframe: idAcrossTimeframe,
  };
  try {
    const response = await axios.delete<
      ApiResponse<GetDriverLoadsResponse[], Error>
    >(LOADS_BASE_URL, {
      params: params,
    });
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
