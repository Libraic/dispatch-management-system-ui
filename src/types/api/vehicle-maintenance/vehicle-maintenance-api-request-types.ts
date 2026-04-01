export interface UpsertVehicleMaintenanceRecordRequest {
  vehicleMaintenanceRecordUuid?: string;
  relationId: string;
  location: string;
  startDate: Date;
  endDate: Date;
}
