import type { DriverData } from "../types/api/driver/driver-api-response-types.ts";
import type {
  DaysOffPeriodData,
  DriverWorkforce,
  LoadData,
  LoadStatus,
  VehicleMaintenanceData,
} from "../types/internal/planner/planner-types.ts";

export type DispatchingContextData = {
  days: string[];
  upsertLoadFn: (
    workforce: DriverWorkforce,
    loadData: LoadData,
    loadStatus?: LoadStatus,
  ) => Promise<string | null>;
  upsertVehicleMaintenanceRecordFn: (
    shop: VehicleMaintenanceData,
    driverId: string,
    relationId: string,
  ) => Promise<string | null>;
  upsertDaysOffPeriodFn: (
    daysOffPeriodData: DaysOffPeriodData,
    driverId: string,
    relationId: string,
  ) => Promise<string | null>;
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
