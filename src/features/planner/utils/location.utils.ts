import type {
  LoadLocationData,
  LocationLabel,
} from "#/types/internal/planner/planner-types";
import type { LocationDetails } from "#/features/planner/types/location.types";
import { generateUuid } from "#/utils/global/general-utils";
import { hhmmToTime } from "#/types/internal/time/time-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  getCurrentDay,
  getNextDayFromCurrentDate,
} from "#/utils/global/date-utils";
import type { ApiLoadLocation } from "#/features/planner/types/load.api.types";
import type { LoadCreationType } from "#/features/planner/components/internal/forms/load/LoadForm";
import { DEFAULT_TIMEZONE_DATA } from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings.constants";

export const fromApiLoadLocationsToLoadLocationsData = (
  locations?: ApiLoadLocation[],
  day?: string,
  loadCreationType?: LoadCreationType,
): LoadLocationData[] => {
  const loadLocations: LoadLocationData[] = [];
  if (!locations || locations.length === 0) {
    if (loadCreationType === "Ingestion") {
      return getInitialLoadLocations(day ?? getCurrentDay());
    }

    return loadLocations;
  }

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    if (
      loadCreationType === "Ingestion" &&
      i === 0 &&
      location.label !== "Starting Point"
    ) {
      const startingPoint = getBlankLocation(
        location.date ?? getCurrentDay(),
        loadLocations.length,
        "Starting Point",
        {
          location: location.location,
          address: location.address,
        },
      );
      loadLocations.push(startingPoint);
    }

    const loadLocation: LoadLocationData = {
      uuid: generateUuid(),
      label: location.label as LocationLabel,
      date: location.date ?? getCurrentDay(),
      time: hhmmToTime(location.time),
      location: location.location ?? BLANK_STRING,
      // The locations are coming sorted from API, so we can use the length of the array as the order,
      // without having to normalize the order if we added a starting point.
      order: loadLocations.length,
      address: location.address,
      timezone: location.timezone ?? DEFAULT_TIMEZONE_DATA.value,
    };
    loadLocations.push(loadLocation);
  }

  return loadLocations;
};

export const getBlankLocation = (
  date: string,
  order: number,
  label?: LocationLabel,
  locationDetails?: LocationDetails,
): LoadLocationData => {
  return {
    uuid: generateUuid(),
    label: label ?? "Pick Up",
    date: date,
    time: hhmmToTime(getCurrentTime()),
    location: locationDetails?.location ?? BLANK_STRING,
    order: order,
    address: locationDetails?.address,
    timezone: locationDetails?.timezone ?? DEFAULT_TIMEZONE_DATA.value,
  };
};

export const getInitialLoadLocations = (
  date: string,
  locationDetails?: LocationDetails,
): LoadLocationData[] => {
  const startingPoint = getBlankLocation(
    date,
    0,
    "Starting Point",
    locationDetails,
  );
  const pickUpLocation = getBlankLocation(date, 1, "Pick Up", locationDetails);
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
