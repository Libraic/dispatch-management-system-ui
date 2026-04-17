import type { DriverData } from "#/types/api/driver/driver-api-response-types";
import type {
  DaysOffPeriodData,
  DriverWorkforce,
  LoadData,
  VehicleMaintenanceData,
} from "#/types/internal/planner/planner-types";

export type DispatchingContextData = {
  days: string[];
  upsertLoadFn: (workforce: DriverWorkforce, loadData: LoadData) => void;
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
