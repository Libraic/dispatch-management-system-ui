import type {
  ApiLoadLocation,
  GetDispatchingDataResponse,
  UpsertLoadRequest,
} from "#/types/api/loads/load-api-types";
import type {
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
  LoadLocationData,
} from "#/types/internal/planner/planner-types";
import { toIsoDate, toNormalizedIsoDate } from "#/utils/global/date-utils";
import { ZERO } from "#/constants/common/global-constants";
import { fromGetVehicleMaintenanceRecordToVehicleMaintenanceData } from "#/utils/planner/vehicle-maintenance-utils";
import { fromGetDaysOffPeriodResponseToDaysOffPeriodData } from "#/utils/planner/days-off-utils";
import { v4 as uuidv4 } from "uuid";
import { cleanPhoneNumber } from "#/shared/utils/inputField.formatter";
import { timeToHHmm } from "#/types/internal/time/time-types";
import { fromGetLoadResponseToLoadData } from "#/features/planner/utils/loads.utils";

export const fromGetDriverLoadsResponsesToDispatcherLoadDataList = (
  getDriverLoadsResponses: GetDispatchingDataResponse[],
  startDate: string,
  endDate: string,
) => {
  const dispatchingRelations: DispatchingRelation[] = [];
  const startDateObject = toNormalizedIsoDate(startDate);
  const endDateObject = toNormalizedIsoDate(endDate);
  for (const getDriverLoadResponse of getDriverLoadsResponses) {
    const driverLoadDataList: DriverWorkforce[] = [];
    let totalRevenue = 0.0;
    let totalMiles = 0.0;
    for (const driverLoadData of getDriverLoadResponse.workforceData) {
      const loads: LoadData[] = [];
      let driverTotalRevenue = 0.0;
      let driverTotalMiles = 0.0;
      for (const loadDatum of driverLoadData.loads) {
        const mappedLoadDatum = fromGetLoadResponseToLoadData(loadDatum);
        loads.push(mappedLoadDatum);
        if (
          !(
            mappedLoadDatum.endDate < startDateObject ||
            endDateObject < mappedLoadDatum.startDate
          )
        ) {
          driverTotalRevenue += loadDatum.revenue ?? ZERO;
          driverTotalMiles += loadDatum.miles ?? ZERO;
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
      totalMiles += driverTotalMiles;
      driverLoadDataList.push({
        relationId: driverLoadData.relationUuid,
        driver: driverLoadData.driver,
        totalRevenue: driverTotalRevenue,
        totalMiles: driverTotalMiles,
        loads: loads,
        vehicleMaintenanceRecords: vehicleMaintenanceRecords,
        daysOffPeriods: daysOffPeriodData,
      });
    }

    dispatchingRelations.push({
      id: uuidv4(),
      dispatcher: getDriverLoadResponse.dispatcher,
      totalMiles: totalMiles,
      totalRevenue: totalRevenue,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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
    relationUuid: relationId,
    revenue: loadData.revenue ? parseFloat(loadData.revenue) : ZERO,
    miles: loadData.miles ? parseFloat(loadData.miles) : ZERO,
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
    date: toIsoDate(location.date),
    location: location.location,
    order: location.order,
    time: timeToHHmm(location.time),
    address: location.address,
  }));
};
