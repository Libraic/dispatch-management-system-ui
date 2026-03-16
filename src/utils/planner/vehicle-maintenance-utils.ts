import type {
  DispatcherPlanningData,
  VehicleMaintenanceData,
} from "../../types/internal/planner/planner-types.ts";
import { updateDriverField } from "./planner-utils.ts";
import type { GetVehicleMaintenanceResponse } from "../../types/api/vehicle-maintenance/vehicle-maintenance-api-response-types.ts";
import { toIsoDate, toNormalizedIsoDate } from "../global/date-utils.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const changeWorkforceVehicleMaintenanceData = (
  prevDispatcherPlanningData: DispatcherPlanningData[],
  dispatcherPlanningDatumId: string,
  driverId: string,
  newVehicleMaintenanceDatum: VehicleMaintenanceData,
) =>
  updateDriverField(
    prevDispatcherPlanningData,
    dispatcherPlanningDatumId,
    driverId,
    "vehicleMaintenanceRecords",
    (records) => [
      ...records.filter((prev) => prev.id !== newVehicleMaintenanceDatum.id),
      newVehicleMaintenanceDatum,
    ],
  );

export const updateVehicleMaintenanceDataAfterDeletion = (
  prevDispatcherPlanningData: DispatcherPlanningData[],
  dispatcherPlanningDatumId: string,
  driverId: string,
  newVehicleMaintenanceData: VehicleMaintenanceData[],
) =>
  updateDriverField(
    prevDispatcherPlanningData,
    dispatcherPlanningDatumId,
    driverId,
    "vehicleMaintenanceRecords",
    () => newVehicleMaintenanceData,
  );

export const fromGetVehicleMaintenanceRecordToVehicleMaintenanceData = (
  vehicleMaintenanceRecord: GetVehicleMaintenanceResponse,
): VehicleMaintenanceData => {
  return {
    id: vehicleMaintenanceRecord.vehicleMaintenanceRecordUuid,
    startDate: toNormalizedIsoDate(vehicleMaintenanceRecord.startDate),
    endDate: toNormalizedIsoDate(vehicleMaintenanceRecord.endDate),
    location: vehicleMaintenanceRecord.location,
  };
};

export const getBlankVehicleMaintenanceData = (
  day?: string,
): VehicleMaintenanceData => {
  const startDate = day ? new Date(day) : new Date(toIsoDate(new Date()));
  return {
    startDate: startDate,
    endDate: new Date(startDate),
    location: BLANK_STRING,
  };
};
