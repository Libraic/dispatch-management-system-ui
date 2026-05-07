import type {
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
  LoadLocationData,
} from "#/types/internal/planner/planner-types";
import {
  fromApiLoadLocationsToLoadLocationsData,
  getInitialLoadLocations,
} from "#/features/planner/utils/location.utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  getCurrentDay,
  getNextDayFromCurrentDate,
} from "#/utils/global/date-utils";
import type { LocationDetails } from "#/features/planner/types/location.types";
import type { LoadCreationType } from "#/features/planner/components/internal/forms/load/LoadForm";
import type { GetLoadResponse } from "#/features/planner/types/load.api.types";
import type { DriverData } from "#/types/api/driver/driver-api-response-types";

export const toLoadDataToDispatcherRelation = (
  prevDispatcherLoadDataList: DispatchingRelation[],
  dispatcherLoadDataIdentifier: string,
  newLoadDatum: LoadData,
  driver: DriverData,
) => {
  const newDispatcherLoadDataList: DispatchingRelation[] = [];
  for (const prevDispatcherLoadData of prevDispatcherLoadDataList) {
    if (prevDispatcherLoadData.id !== dispatcherLoadDataIdentifier) {
      newDispatcherLoadDataList.push(prevDispatcherLoadData);
    } else {
      const newDriverLoadDataList: DriverWorkforce[] = [];
      for (const workforce of prevDispatcherLoadData.workforceUnits) {
        if (workforce.driver.uuid !== driver.uuid) {
          newDriverLoadDataList.push(workforce);
        } else {
          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          const loads = workforce.loads.filter(
            (loadDatum) => loadDatum.id !== newLoadDatum.id,
          );
          loads.push(newLoadDatum);
          const startDateObject = prevDispatcherLoadData.startDate;
          const endDateObject = prevDispatcherLoadData.endDate;
          for (const loadDatum of loads) {
            const loadStartDate = loadDatum.startDate;
            const loadEndDate = loadDatum.endDate;
            if (
              !(loadEndDate < startDateObject || endDateObject < loadStartDate)
            ) {
              driverTotalRevenue += parseFloat(loadDatum.revenue);
              driverTotalMiles += parseFloat(loadDatum.loadedMiles);
            }
          }

          newDriverLoadDataList.push({
            ...workforce,
            totalRevenue: driverTotalRevenue,
            totalLoadedMiles: driverTotalMiles,
            driver: driver,
            loads: loads,
          });
        }
      }

      let dispatcherTotalMiles = 0;
      let dispatcherTotalRevenue = 0;
      for (const driverLoadDatum of newDriverLoadDataList) {
        dispatcherTotalMiles += driverLoadDatum.totalLoadedMiles;
        dispatcherTotalRevenue += driverLoadDatum.totalRevenue;
      }
      newDispatcherLoadDataList.push({
        ...prevDispatcherLoadData,
        totalLoadedMiles: dispatcherTotalMiles,
        totalRevenue: dispatcherTotalRevenue,
        workforceUnits: newDriverLoadDataList,
      });
    }
  }

  return newDispatcherLoadDataList;
};

export const updateLoadsAfterDeletions = (
  prevDispatcherLoadDataList: DispatchingRelation[],
  dispatcherLoadDataIdentifier: string,
  newLoadData: LoadData[],
  driver: DriverData,
) => {
  const newDispatcherLoadDataList: DispatchingRelation[] = [];
  for (const prevDispatcherLoadData of prevDispatcherLoadDataList) {
    if (prevDispatcherLoadData.id !== dispatcherLoadDataIdentifier) {
      newDispatcherLoadDataList.push(prevDispatcherLoadData);
    } else {
      const newDriverLoadDataList: DriverWorkforce[] = [];
      for (const currentDriverLoadData of prevDispatcherLoadData.workforceUnits) {
        if (currentDriverLoadData.driver!!.uuid !== driver.uuid) {
          newDriverLoadDataList.push(currentDriverLoadData);
        } else {
          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          for (const loadDatum of newLoadData) {
            const startDateObject = prevDispatcherLoadData.startDate;
            const endDateObject = prevDispatcherLoadData.endDate;
            if (
              !(
                loadDatum.endDate < startDateObject ||
                endDateObject < loadDatum.startDate
              )
            ) {
              driverTotalRevenue += parseFloat(loadDatum.revenue);
              driverTotalMiles += parseFloat(loadDatum.loadedMiles);
            }
          }

          newDriverLoadDataList.push({
            ...currentDriverLoadData,
            totalRevenue: driverTotalRevenue,
            totalLoadedMiles: driverTotalMiles,
            driver: driver,
            loads: newLoadData,
          });
        }
      }

      let dispatcherTotalMiles = 0;
      let dispatcherTotalRevenue = 0;
      for (const driverLoadDatum of newDriverLoadDataList) {
        dispatcherTotalMiles += driverLoadDatum.totalLoadedMiles;
        dispatcherTotalRevenue += driverLoadDatum.totalRevenue;
      }
      newDispatcherLoadDataList.push({
        ...prevDispatcherLoadData,
        totalLoadedMiles: dispatcherTotalMiles,
        totalRevenue: dispatcherTotalRevenue,
        workforceUnits: newDriverLoadDataList,
      });
    }
  }

  return newDispatcherLoadDataList;
};

export const fromGetLoadResponseToLoadData = (
  loadResponse: GetLoadResponse,
  day?: string,
  loadCreationType?: LoadCreationType,
): LoadData => {
  const startDate = loadResponse.startDate
    ? loadResponse.startDate
    : (day ?? getCurrentDay());
  const endDate = loadResponse.endDate
    ? loadResponse.endDate
    : getNextDayFromCurrentDate(startDate);
  return {
    id: loadResponse.loadUuid,
    loadNumber: loadResponse.loadNumber ?? BLANK_STRING,
    revenue: `${loadResponse.revenue ?? BLANK_STRING}`,
    loadedMiles: `${loadResponse.loadedMiles ?? BLANK_STRING}`,
    emptyMiles: loadResponse.emptyMiles?.toString(),
    broker: loadResponse.broker ?? BLANK_STRING,
    representative: loadResponse.representative ?? undefined,
    representativeContactNumber: loadResponse.representativeContactNumber,
    loadStatus: loadResponse.loadStatus ?? "Booked",
    startDate: startDate,
    endDate: endDate,
    locations: fromApiLoadLocationsToLoadLocationsData(
      loadResponse.locations,
      day,
      loadCreationType,
    ),
  };
};

export const getBlankLoadData = (
  day: string,
  locationDetails?: LocationDetails,
): LoadData => {
  const startDate = day;
  const endDate = getNextDayFromCurrentDate(startDate);
  return {
    loadNumber: BLANK_STRING,
    broker: BLANK_STRING,
    startDate: startDate,
    endDate: endDate,
    revenue: BLANK_STRING,
    loadedMiles: BLANK_STRING,
    loadStatus: "Dispatched",
    locations: getInitialLoadLocations(startDate, locationDetails),
  };
};

export const getFirstPickUpLocation = (locations: LoadLocationData[]) => {
  for (const location of locations) {
    if (location.label === "Pick Up") {
      return location;
    }
  }

  return undefined;
};

export const getLastDeliveryLocation = (locations: LoadLocationData[]) => {
  for (let i = locations.length - 1; i >= 0; i--) {
    if (locations[i].label === "Delivery") {
      return locations[i];
    }
  }

  return undefined;
};
