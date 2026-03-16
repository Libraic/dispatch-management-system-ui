import axios from "axios";
import {
  LOADS_BASE_URL,
  LOADS_RELATIONS_URL,
  LOADS_STARTING_POINT_PATH,
} from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import type {
  ApiResponse,
  NoContentResponse,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import type {
  GetDriversPlanningDataResponse,
  GetLoadStartingPointResponse,
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

export const getLoadData = async (
  relationId: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResponse<LoadResponse[], Error>> => {
  const url = LOADS_RELATIONS_URL + `/${relationId}`;
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

export const getStartingPointLocation = async (
  relationUuid: string,
  date: Date,
): Promise<ApiResponse<GetLoadStartingPointResponse, Error>> => {
  const url =
    LOADS_RELATIONS_URL + `/${relationUuid}` + LOADS_STARTING_POINT_PATH;
  const params = {
    date: toIsoDate(date),
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
      ApiResponse<GetDriversPlanningDataResponse[], Error>
    >(LOADS_BASE_URL + `/${loadUuid}`);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
