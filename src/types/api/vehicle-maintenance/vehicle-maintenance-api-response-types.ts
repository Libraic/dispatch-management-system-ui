export interface UpsertVehicleMaintenanceRecordResponse {
  vehicleMaintenanceRecordUuid: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface GetVehicleMaintenanceResponse
  extends UpsertVehicleMaintenanceRecordResponse {}
