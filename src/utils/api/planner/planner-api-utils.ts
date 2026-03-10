import { Driver } from "../../../types/internal/classes/Driver.ts";
import { ZERO } from "../../../constants/common/global-constants.ts";
import { v4 as uuidv4 } from "uuid";
import type {
  DispatcherLoadData,
  DriverLoadData,
  LoadData,
} from "../../../types/internal/planner/planner-types.ts";
import type { GetDriverLoadsResponse } from "../../../types/api/loads/load-api-types.ts";
import { Dispatcher } from "../../../types/internal/classes/Dispatcher.ts";
import { fromLoadResponseToLoadData } from "../../planner/planner-utils.ts";

export const convertGetDriverLoadsResponsesToDispatcherLoadDataList = (
  getDriverLoadsResponses: GetDriverLoadsResponse[],
  startDate: string,
  endDate: string,
) => {
  const dispatcherLoadDataList: DispatcherLoadData[] = [];
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  for (const getDriverLoadResponse of getDriverLoadsResponses) {
    const driverLoadDataList: DriverLoadData[] = [];
    let totalRevenue = 0.0;
    let totalMiles = 0.0;
    for (const driverLoadData of getDriverLoadResponse.driverLoads) {
      const loadData = new Map<string, LoadData>();
      let driverTotalRevenue = 0.0;
      let driverTotalMiles = 0.0;
      for (const loadDatum of driverLoadData.loads) {
        loadData.set(loadDatum.date, fromLoadResponseToLoadData(loadDatum));
        const dateObject = new Date(loadDatum.date);
        if (dateObject >= startDateObject && dateObject <= endDateObject) {
          driverTotalRevenue += loadDatum.revenue ?? ZERO;
          driverTotalMiles += loadDatum.miles ?? ZERO;
        }
      }
      totalRevenue += driverTotalRevenue;
      totalMiles += driverTotalMiles;
      driverLoadDataList.push({
        identifier: driverLoadData.loadUuid,
        driver: new Driver(driverLoadData.driver),
        totalRevenue: driverTotalRevenue,
        totalMiles: driverTotalMiles,
        loads: loadData,
      });
    }

    dispatcherLoadDataList.push({
      identifier: uuidv4(),
      dispatcher:
        getDriverLoadResponse.dispatcher === null
          ? null
          : new Dispatcher(getDriverLoadResponse.dispatcher),
      totalMiles: totalMiles,
      totalRevenue: totalRevenue,
      startDate: startDate,
      endDate: endDate,
      driverLoads: driverLoadDataList,
    });
  }

  return dispatcherLoadDataList;
};
