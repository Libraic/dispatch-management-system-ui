export interface UpsertVehicleMaintenanceRecordRequest {
  vehicleMaintenanceRecordUuid?: string;
  relationId: string;
  location: string;
  startDate: string;
  endDate: string;
}
