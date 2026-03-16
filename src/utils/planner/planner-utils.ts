import type {
  DispatcherLoadData,
  DriverLoadData,
  LoadData,
  LoadLocationData,
  LocationLabel,
} from "../../types/internal/planner/planner-types.ts";
import {
  BLANK_STRING,
  HYPHEN,
} from "../../constants/common/global-constants.ts";
import {
  DEFAULT_LOCALE,
  WEEKDAYS,
} from "../../constants/date/date-constants.ts";
import { generateUuid } from "../global/general-utils.ts";
import type {
  ApiLoadLocation,
  LoadResponse,
} from "../../types/api/loads/load-api-types.ts";
import type { DriverData } from "../../types/api/driver/driver-api-response-types.ts";
import { getNextDayFromCurrentDate } from "../global/date-utils.ts";

export const upsertDriverLoadCallbackFunction = (
  prevDispatcherLoadDataList: DispatcherLoadData[],
  dispatcherLoadDataIdentifier: string,
  newLoadDatum: LoadData,
  driver: DriverData,
) => {
  const newDispatcherLoadDataList: DispatcherLoadData[] = [];
  for (const prevDispatcherLoadData of prevDispatcherLoadDataList) {
    if (prevDispatcherLoadData.identifier !== dispatcherLoadDataIdentifier) {
      newDispatcherLoadDataList.push(prevDispatcherLoadData);
    } else {
      const newDriverLoadDataList: DriverLoadData[] = [];
      for (const currentDriverLoadData of prevDispatcherLoadData.driverLoads) {
        if (currentDriverLoadData.driver!!.uuid !== driver.uuid) {
          newDriverLoadDataList.push(currentDriverLoadData);
        } else {
          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          const loads = currentDriverLoadData.loads.filter(
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
            ...currentDriverLoadData,
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
        driverLoads: newDriverLoadDataList,
      });
    }
  }

  return newDispatcherLoadDataList;
};

export const updateLoadsAfterDeletions = (
  prevDispatcherLoadDataList: DispatcherLoadData[],
  dispatcherLoadDataIdentifier: string,
  newLoadData: LoadData[],
  driver: DriverData,
) => {
  const newDispatcherLoadDataList: DispatcherLoadData[] = [];
  for (const prevDispatcherLoadData of prevDispatcherLoadDataList) {
    if (prevDispatcherLoadData.identifier !== dispatcherLoadDataIdentifier) {
      newDispatcherLoadDataList.push(prevDispatcherLoadData);
    } else {
      const newDriverLoadDataList: DriverLoadData[] = [];
      for (const currentDriverLoadData of prevDispatcherLoadData.driverLoads) {
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
        driverLoads: newDriverLoadDataList,
      });
    }
  }

  return newDispatcherLoadDataList;
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
    location: location ?? BLANK_STRING,
    order: order,
  };
};

export const getInitialLoadLocations = (
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

export const getWeekWithDayAndMonth = (week: string[]) => {
  const biweeklyTimeline = [...week];
  for (const weekDay of week) {
    const [y, m, d] = weekDay.split(HYPHEN).map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 7);
    biweeklyTimeline.push(date.toLocaleDateString(DEFAULT_LOCALE));
  }

  return biweeklyTimeline.map((day, index) => {
    const dateParts = day.split(HYPHEN);
    return `${WEEKDAYS[index % 7].substring(0, 3)} ${dateParts[0]}${HYPHEN}${dateParts[1]}${HYPHEN}${dateParts[2]}`;
  });
};

export const fromLoadResponseToLoadData = (
  loadResponse: LoadResponse,
): LoadData => {
  return {
    id: loadResponse.loadUuid,
    revenue: `${loadResponse.revenue ?? BLANK_STRING}`,
    miles: `${loadResponse.miles ?? BLANK_STRING}`,
    broker: loadResponse.broker,
    representative: loadResponse.representative ?? undefined,
    representativeContactNumber: loadResponse.representativeContactNumber,
    loadStatus: loadResponse.loadStatus,
    startDate: loadResponse.startDate,
    endDate: loadResponse.endDate,
    locations: loadResponse.locations.map((location) =>
      fromApiLoadLocationToLoadLocationData(location),
    ),
  };
};

export const fromApiLoadLocationToLoadLocationData = (
  location: ApiLoadLocation,
): LoadLocationData => {
  return {
    uuid: generateUuid(),
    label: location.label as LocationLabel,
    date: new Date(location.date),
    location: location.location ?? BLANK_STRING,
    order: location.order,
  };
};
