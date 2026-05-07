import type {
  ApiLoadLocation,
  GetDispatchingDataResponse,
  UpsertLoadRequest,
} from "#/features/planner/types/load.api.types";
import type {
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
  LoadLocationData,
} from "#/types/internal/planner/planner-types";
import { ZERO } from "#/constants/common/global-constants";
import { fromGetVehicleMaintenanceRecordToVehicleMaintenanceData } from "#/utils/planner/vehicle-maintenance-utils";
import { fromGetDaysOffPeriodResponseToDaysOffPeriodData } from "#/utils/planner/days-off-utils";
import { v4 as uuidv4 } from "uuid";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";
import { timeToHHmm } from "#/types/internal/time/time-types";
import { fromGetLoadResponseToLoadData } from "#/features/planner/utils/loads.utils";

export const fromGetDriverLoadsResponsesToDispatcherLoadDataList = (
  getDriverLoadsResponses: GetDispatchingDataResponse[],
  startDate: string,
  endDate: string,
) => {
  const dispatchingRelations: DispatchingRelation[] = [];
  for (const getDriverLoadResponse of getDriverLoadsResponses) {
    const driverLoadDataList: DriverWorkforce[] = [];
    let totalRevenue = 0.0;
    let totalLoadedMiles = 0.0;
    for (const driverLoadData of getDriverLoadResponse.workforceData) {
      const loads: LoadData[] = [];
      let driverTotalRevenue = 0.0;
      let driverTotalLoadedMiles = 0.0;
      for (const loadDatum of driverLoadData.loads) {
        const mappedLoadDatum = fromGetLoadResponseToLoadData(loadDatum);
        loads.push(mappedLoadDatum);
        if (
          !(
            mappedLoadDatum.endDate < startDate ||
            endDate < mappedLoadDatum.startDate
          )
        ) {
          driverTotalRevenue += loadDatum.revenue ?? ZERO;
          driverTotalLoadedMiles += loadDatum.loadedMiles ?? ZERO;
        }
      }
      const vehicleMaintenanceRecords =
        driverLoadData.vehicleMaintenanceRecords.map(
          (vehicleMaintenanceRecord) =>
            fromGetVehicleMaintenanceRecordToVehicleMaintenanceData(
              vehicleMaintenanceRecord,
            ),
        );

      const daysOffPeriodData = driverLoadData.daysOffPeriods.map(
        (daysOffPeriod) =>
          fromGetDaysOffPeriodResponseToDaysOffPeriodData(daysOffPeriod),
      );

      totalRevenue += driverTotalRevenue;
      totalLoadedMiles += driverTotalLoadedMiles;
      driverLoadDataList.push({
        relationId: driverLoadData.relationUuid,
        driver: driverLoadData.driver,
        totalRevenue: driverTotalRevenue,
        totalLoadedMiles: driverTotalLoadedMiles,
        loads: loads,
        vehicleMaintenanceRecords: vehicleMaintenanceRecords,
        daysOffPeriods: daysOffPeriodData,
      });
    }

    dispatchingRelations.push({
      id: uuidv4(),
      dispatcher: getDriverLoadResponse.dispatcher,
      totalLoadedMiles: totalLoadedMiles,
      totalRevenue: totalRevenue,
      startDate: startDate,
      endDate: endDate,
      workforceUnits: driverLoadDataList,
    });
  }

  return dispatchingRelations;
};

export const toUpsertLoadRequest = (
  loadData: LoadData,
  relationId: string,
): UpsertLoadRequest => {
  const representativeContactNumber = loadData.representativeContactNumber
    ? cleanPhoneNumber(loadData.representativeContactNumber)
    : undefined;
  return {
    loadUuid: loadData.id,
    loadNumber: loadData.loadNumber,
    relationUuid: relationId,
    revenue: loadData.revenue,
    loadedMiles: loadData.loadedMiles,
    emptyMiles: loadData.emptyMiles,
    broker: loadData.broker,
    representative: loadData.representative,
    representativeContactNumber: representativeContactNumber,
    locations: toApiLoadLocations(loadData.locations),
  };
};

const toApiLoadLocations = (
  locations: LoadLocationData[],
): ApiLoadLocation[] => {
  return locations.map((location) => ({
    label: location.label,
    date: location.date,
    location: location.location,
    order: location.order,
    time: timeToHHmm(location.time),
    address: location.address,
    timezone: location.timezone,
  }));
};
