import type { DriverData } from "../../types/api/driver/driver-api-response-types.ts";
import type {
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
  LoadLocationData,
  LocationLabel,
} from "../../types/internal/planner/planner-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import {
  getNextDayFromCurrentDate,
  toNormalizedIsoDate,
} from "../global/date-utils.ts";
import { generateUuid } from "../global/general-utils.ts";
import type {
  ApiLoadLocation,
  GetLoadResponse,
} from "../../types/api/loads/load-api-types.ts";
import { hhmmToTime } from "../../types/internal/time/time-types.ts";

export const mapLoadDataToDispatcherRelation = (
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
              driverTotalMiles += parseFloat(loadDatum.miles);
            }
          }

          newDriverLoadDataList.push({
            ...workforce,
            totalRevenue: driverTotalRevenue,
            totalMiles: driverTotalMiles,
            driver: driver,
            loads: loads,
          });
        }
      }

      let dispatcherTotalMiles = 0;
      let dispatcherTotalRevenue = 0;
      for (const driverLoadDatum of newDriverLoadDataList) {
        dispatcherTotalMiles += driverLoadDatum.totalMiles;
        dispatcherTotalRevenue += driverLoadDatum.totalRevenue;
      }
      newDispatcherLoadDataList.push({
        ...prevDispatcherLoadData,
        totalMiles: dispatcherTotalMiles,
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
              driverTotalMiles += parseFloat(loadDatum.miles);
            }
          }

          newDriverLoadDataList.push({
            ...currentDriverLoadData,
            totalRevenue: driverTotalRevenue,
            totalMiles: driverTotalMiles,
            driver: driver,
            loads: newLoadData,
          });
        }
      }

      let dispatcherTotalMiles = 0;
      let dispatcherTotalRevenue = 0;
      for (const driverLoadDatum of newDriverLoadDataList) {
        dispatcherTotalMiles += driverLoadDatum.totalMiles;
        dispatcherTotalRevenue += driverLoadDatum.totalRevenue;
      }
      newDispatcherLoadDataList.push({
        ...prevDispatcherLoadData,
        totalMiles: dispatcherTotalMiles,
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
): LoadData => {
  const startDate = loadResponse.startDate
    ? toNormalizedIsoDate(loadResponse.startDate)
    : day
      ? new Date(day)
      : new Date();
  const endDate = loadResponse.endDate
    ? toNormalizedIsoDate(loadResponse.endDate)
    : getNextDayFromCurrentDate(startDate);
  return {
    id: loadResponse.loadUuid,
    revenue: `${loadResponse.revenue ?? BLANK_STRING}`,
    miles: `${loadResponse.miles ?? BLANK_STRING}`,
    broker: loadResponse.broker ?? BLANK_STRING,
    representative: loadResponse.representative ?? undefined,
    representativeContactNumber: loadResponse.representativeContactNumber,
    loadStatus: loadResponse.loadStatus ?? "Booked",
    startDate: startDate,
    endDate: endDate,
    locations: fromApiLoadLocationsToLoadLocationsData(loadResponse.locations),
  };
};

export const getBlankLoadData = (
  day: string,
  initialLocation?: string,
): LoadData => {
  const startDate = new Date(day);
  const endDate = getNextDayFromCurrentDate(startDate);
  return {
    broker: BLANK_STRING,
    startDate: startDate,
    endDate: endDate,
    revenue: BLANK_STRING,
    miles: BLANK_STRING,
    loadStatus: "Dispatched",
    locations: getInitialLoadLocations(startDate, initialLocation),
  };
};

export const fromApiLoadLocationsToLoadLocationsData = (
  locations?: ApiLoadLocation[],
): LoadLocationData[] => {
  const loadLocations: LoadLocationData[] = [];
  if (!locations) {
    return loadLocations;
  }

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const loadLocation = {
      uuid: generateUuid(),
      label: location.label as LocationLabel,
      date: location.date ? new Date(location.date) : new Date(),
      time: hhmmToTime(location.time),
      location: location.location ?? BLANK_STRING,
      order: location.order ?? i,
    };
    loadLocations.push(loadLocation);
  }

  return loadLocations;
};

export const getBlankLocation = (
  date: Date,
  order: number,
  label?: LocationLabel,
  location?: string,
): LoadLocationData => {
  return {
    uuid: generateUuid(),
    label: label ?? "Pick Up",
    date: date,
    time: hhmmToTime(getCurrentTime()),
    location: location ?? BLANK_STRING,
    order: order,
  };
};

const getInitialLoadLocations = (
  date: Date,
  initialLocation?: string,
): LoadLocationData[] => {
  const startingPoint = getBlankLocation(
    new Date(date),
    0,
    "Starting Point",
    initialLocation,
  );
  const pickUpLocation = getBlankLocation(
    new Date(date),
    1,
    "Pick Up",
    initialLocation,
  );
  const deliveryLocation = getBlankLocation(
    getNextDayFromCurrentDate(date),
    2,
    "Delivery",
  );
  return [startingPoint, pickUpLocation, deliveryLocation];
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
