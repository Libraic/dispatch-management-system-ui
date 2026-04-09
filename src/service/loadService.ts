import axios from "axios";
import {
  LOADS_BASE_URL,
  LOADS_DOCUMENTS,
  LOADS_RELATIONS_URL,
  LOADS_STARTING_POINT_PATH,
} from "../constants/api/api-paths.ts";
import type {
  ApiResponse,
  NoContentResponse,
  Result,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import type {
  GetDispatchingDataResponse,
  GetLoadResponse,
  GetLoadStartingPointResponse,
  UpsertLoadRequest,
  UpsertLoadResponse,
} from "../types/api/loads/load-api-types.ts";
import { toIsoDate } from "../utils/global/date-utils.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import { createUpsertLoadRequest } from "../utils/api/planner/planner-api-utils.ts";
import type {
  LoadData,
  LoadStatus,
} from "../types/internal/planner/planner-types.ts";

export const upsertLoad = async (
  loadData: LoadData,
  relationId: string,
  loadStatus?: LoadStatus,
): Promise<Result<UpsertLoadResponse>> => {
  const upsertRequest = createUpsertLoadRequest(loadData, relationId);

  if (loadStatus) {
    upsertRequest.loadStatus = loadStatus;
  }

  const upsertResponse = await upsertLoadApiCall(upsertRequest);

  if (upsertResponse.error) {
    return {
      ok: false,
      error: upsertResponse.error.message,
    };
  }

  return {
    ok: true,
    data: upsertResponse.data!!,
  };
};

export const ingestDocument = async (
  file: File,
): Promise<Result<GetLoadResponse>> => {
  const ingestResponse = await ingestDocumentApiCall(file);
  if (ingestResponse.error) {
    return {
      ok: false,
      error: ingestResponse.error.message,
    };
  }
  return {
    ok: true,
    data: ingestResponse.data!!,
  };
};

export const getLoadData = async (
  relationId: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResponse<GetLoadResponse[], Error>> => {
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
  } catch (error: any) {
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
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const deleteLoadByUuid = async (
  loadUuid: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  try {
    const response = await axios.delete<
      ApiResponse<GetDispatchingDataResponse[], Error>
    >(LOADS_BASE_URL + `/${loadUuid}`);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

const ingestDocumentApiCall = async (
  file: File,
): Promise<ApiResponse<GetLoadResponse, Error>> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(LOADS_DOCUMENTS, formData);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

const upsertLoadApiCall = async (
  upsertLoadRequest: UpsertLoadRequest,
): Promise<ApiResponse<UpsertLoadResponse, Error>> => {
  try {
    const response = await axios.put(LOADS_BASE_URL, upsertLoadRequest);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};
