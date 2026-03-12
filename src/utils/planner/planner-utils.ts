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
  ZERO,
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

export const upsertDriverLoadCallbackFunction = (
  prevDispatcherLoadDataList: DispatcherLoadData[],
  dispatcherLoadDataIdentifier: string,
  loadDataList: LoadData[],
  driver: DriverData,
  currentWeek: string[],
  loadUuid?: string,
) => {
  const newDispatcherLoadDataList: DispatcherLoadData[] = [];
  for (const prevDispatcherLoadData of prevDispatcherLoadDataList) {
    if (prevDispatcherLoadData.identifier !== dispatcherLoadDataIdentifier) {
      newDispatcherLoadDataList.push(prevDispatcherLoadData);
    } else {
      const newDriverLoadDataList: DriverLoadData[] = [];
      for (const currentLoadData of prevDispatcherLoadData.driverLoads) {
        if (currentLoadData.driver!!.uuid !== driver.uuid) {
          newDriverLoadDataList.push(currentLoadData);
        } else {
          const newLoadData = new Map<string, LoadData>(
            loadDataList.map((loadData) => [loadData.date, loadData]),
          );

          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          for (const loadDatum of newLoadData.values()) {
            if (currentWeek.includes(loadDatum.date)) {
              driverTotalMiles += loadDatum.miles
                ? parseFloat(loadDatum.miles)
                : ZERO;
              driverTotalRevenue += loadDatum.revenue
                ? parseFloat(loadDatum.revenue)
                : ZERO;
            }
          }

          newDriverLoadDataList.push({
            ...currentLoadData,
            identifier: loadUuid ?? null,
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

export const extractUnfocusedCellInformation = (
  day: string,
  driverLoadData?: DriverLoadData,
): string => {
  if (!driverLoadData) {
    return BLANK_STRING;
  }
  const loadData = driverLoadData.loads.get(day);
  if (!loadData) {
    return BLANK_STRING;
  }

  if (loadData.locations.length === 0) {
    return loadData.loadStatus;
  }

  return loadData.locations
    .map((l) => l.location)
    .filter((loc): loc is string => Boolean(loc))
    .filter((loc, index, arr) => index === 0 || loc !== arr[index - 1])
    .join(" -> ");
};

export const getBlankLocation = (
  date: Date,
  order: number,
  label?: LocationLabel,
): LoadLocationData => {
  return {
    uuid: generateUuid(),
    label: label ?? "Pick Up",
    date: date,
    location: BLANK_STRING,
    order: order,
  };
};

export const getInitialLoadLocations = (date: Date): LoadLocationData[] => {
  const startingPoint = getBlankLocation(new Date(date), 0, "Starting Point");
  const pickUpLocation = getBlankLocation(new Date(date), 1, "Pick Up");
  const deliveryLocation = getBlankLocation(
    new Date(date.getTime() + 24 * 60 * 60 * 1000),
    2,
    "Delivery",
  );
  return [startingPoint, pickUpLocation, deliveryLocation];
};

export const getBlankLoadData = (day: string): LoadData => {
  const date = new Date(day);
  return {
    broker: BLANK_STRING,
    date: day,
    revenue: BLANK_STRING,
    miles: BLANK_STRING,
    loadStatus: "Covered",
    locations: getInitialLoadLocations(date),
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
    return `${WEEKDAYS[index % 7].substring(0, 3)} ${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  });
};

export const fromLoadResponsesToLoadData = (loadResponses: LoadResponse[]) => {
  return loadResponses.map((loadResponse) =>
    fromLoadResponseToLoadData(loadResponse),
  );
};

export const fromLoadResponseToLoadData = (
  loadResponse: LoadResponse,
): LoadData => {
  return {
    revenue: `${loadResponse.revenue ?? BLANK_STRING}`,
    miles: `${loadResponse.miles ?? BLANK_STRING}`,
    broker: loadResponse.broker,
    representative: loadResponse.representative ?? undefined,
    representativeContactNumber: loadResponse.representativeContactNumber,
    loadStatus: loadResponse.loadStatus,
    date: loadResponse.date,
    idAcrossTimeframe: loadResponse.idAcrossTimeframe,
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
