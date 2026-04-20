import type { Error } from "#/types/api/common/api-errors-types";
import axios from "axios";
import {
  VEHICLE_MAINTENANCE_BASE_URL,
  VEHICLE_MAINTENANCE_RELATIONS_URL,
} from "#/shared/api/constants/apiPaths.constants";
import { handleApiErrors } from "#/utils/api/api-common-error-utils";
import type { UpsertVehicleMaintenanceRecordRequest } from "#/types/api/vehicle-maintenance/vehicle-maintenance-api-request-types";
import type {
  GetVehicleMaintenanceResponse,
  UpsertVehicleMaintenanceRecordResponse,
} from "#/types/api/vehicle-maintenance/vehicle-maintenance-api-response-types";
import type { GetDispatchingDataResponse } from "#/features/planner/types/load.api.types";
import { toIsoDate } from "#/utils/global/date-utils";
import type { ApiResponse, NoContentResponse } from "#/shared/types/api.types";

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
      ApiResponse<GetDispatchingDataResponse[], Error>
    >(VEHICLE_MAINTENANCE_BASE_URL + `/${vehicleMaintenanceRecordUuid}`);
    return response.data;
  } catch (error) {
    return handleApiErrors(error);
  }
};
