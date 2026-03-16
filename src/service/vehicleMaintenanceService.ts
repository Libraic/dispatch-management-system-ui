import type {
  ApiResponse,
  NoContentResponse,
} from "../types/api/common/api-response-types.ts";
import type { Error } from "../types/api/common/api-errors-types.ts";
import axios from "axios";
import {
  VEHICLE_MAINTENANCE_BASE_URL,
  VEHICLE_MAINTENANCE_RELATIONS_URL,
} from "../constants/api/api-paths.ts";
import { handleApiErrors } from "../utils/api/api-common-error-utils.ts";
import type { UpsertVehicleMaintenanceRecordRequest } from "../types/api/vehicle-maintenance/vehicle-maintenance-api-request-types.ts";
import type {
  GetVehicleMaintenanceResponse,
  UpsertVehicleMaintenanceRecordResponse,
} from "../types/api/vehicle-maintenance/vehicle-maintenance-api-response-types.ts";
import type { GetDriversPlanningDataResponse } from "../types/api/loads/load-api-types.ts";
import { toIsoDate } from "../utils/global/date-utils.ts";

export const upsertVehicleMaintenanceRecord = async (
  request: UpsertVehicleMaintenanceRecordRequest,
): Promise<ApiResponse<UpsertVehicleMaintenanceRecordResponse, Error>> => {
  try {
    const response = await axios.put(VEHICLE_MAINTENANCE_BASE_URL, request);
    return response.data;
  } catch (error: any) {
    return handleApiErrors(error);
  }
};

export const getVehicleMaintenanceData = async (
  relationId: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResponse<GetVehicleMaintenanceResponse[], Error>> => {
  const url = VEHICLE_MAINTENANCE_RELATIONS_URL + `/${relationId}`;
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

export const deleteVehicleMaintenanceRecordByUuid = async (
  vehicleMaintenanceRecordUuid: string,
): Promise<ApiResponse<NoContentResponse, Error>> => {
  try {
    const response = await axios.delete<
      ApiResponse<GetDriversPlanningDataResponse[], Error>
    >(VEHICLE_MAINTENANCE_BASE_URL + `/${vehicleMaintenanceRecordUuid}`);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
