import { ZERO } from "../../../constants/common/global-constants.ts";
import { v4 as uuidv4 } from "uuid";
import type {
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
} from "../../../types/internal/planner/planner-types.ts";
import type { GetDispatchingDataResponse } from "../../../types/api/loads/load-api-types.ts";
import { toNormalizedIsoDate } from "../../global/date-utils.ts";
import { fromGetLoadResponseToLoadData } from "../../planner/load-utils.ts";
import { fromGetVehicleMaintenanceRecordToVehicleMaintenanceData } from "../../planner/vehicle-maintenance-utils.ts";
import { fromGetDaysOffPeriodResponseToDaysOffPeriodData } from "../../planner/days-off-utils.ts";

export const convertGetDriverLoadsResponsesToDispatcherLoadDataList = (
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
