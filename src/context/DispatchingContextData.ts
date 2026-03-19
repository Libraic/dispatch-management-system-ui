import type { DriverData } from "../types/api/driver/driver-api-response-types.ts";
import type {
  DaysOffPeriodData,
  LoadData,
  VehicleMaintenanceData,
} from "../types/internal/planner/planner-types.ts";

export type DispatchingContextData = {
  days: string[];
  upsertLoadDataFn: (driver: DriverData, loadData: LoadData) => void;
  upsertVehicleMaintenanceRecordFn: (
    shop: VehicleMaintenanceData,
    driverId: string,
    relationId: string,
  ) => void;
  upsertDaysOffPeriodFn: (
    daysOffPeriodData: DaysOffPeriodData,
    driverId: string,
    relationId: string,
  ) => void;
  postLoadDeleteUpdateFn: (
    driver: DriverData,
    loadDataList: LoadData[],
  ) => void;
  postVehicleMaintenanceRecordDeleteUpdateFn: (
    driverId: string,
    vehicleMaintenanceData: VehicleMaintenanceData[],
  ) => void;
  postDaysOffPeriodDeleteUpdateFn: (
    driverId: string,
    daysOffPeriodData: DaysOffPeriodData[],
  ) => void;
};
