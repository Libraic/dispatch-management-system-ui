import type {
  LoadData,
  LoadDataError,
  LoadLocationError,
} from "../../types/internal/planner/planner-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import { validatePhoneNumber } from "../registration/registration-utils.ts";
import { cleanPhoneNumber } from "../global/input-form-utils.ts";
import {
  BROKER_REQUIRED_ERROR,
  LOCATION_REQUIRED,
  LOCATIONS_CHRONOLOGICAL_ORDER_ERROR,
  MILES_REQUIRED_ERROR,
  REVENUE_REQUIRED_ERROR,
} from "../../constants/error/error-message-constants.ts";

export const getErrorsIfPresent = (loadData: LoadData) => {
  const loadErrors: LoadDataError = {};
  if (loadData.revenue === BLANK_STRING) {
    loadErrors.revenueError = REVENUE_REQUIRED_ERROR;
  }
  if (loadData.miles === BLANK_STRING) {
    loadErrors.milesError = MILES_REQUIRED_ERROR;
  }
  if (loadData.broker === BLANK_STRING) {
    loadErrors.brokerError = BROKER_REQUIRED_ERROR;
  }

  const representativeContactNumber = loadData.representativeContactNumber
    ? cleanPhoneNumber(loadData.representativeContactNumber)
    : BLANK_STRING;
  const representativeContactNumberValidation = validatePhoneNumber(
    representativeContactNumber,
    "optional",
  );
  if (representativeContactNumberValidation !== BLANK_STRING) {
    loadErrors.representativeContactNumberError =
      representativeContactNumberValidation;
  }

  const locationErrors = new Map<string, LoadLocationError>();
  for (let i = 0; i < loadData.locations.length; i++) {
    const currentLocation = loadData.locations[i];
    const locationError: LoadLocationError = {};
    if (i > 0 && currentLocation.date < loadData.locations[i - 1].date) {
      locationError.dateError = LOCATIONS_CHRONOLOGICAL_ORDER_ERROR;
    }
    if (currentLocation.location === BLANK_STRING) {
      locationError.locationError = LOCATION_REQUIRED;
    }
    locationErrors.set(currentLocation.uuid, locationError);
  }

  if (Object.keys(locationErrors).length !== 0) {
    loadErrors.locationsErrors = locationErrors;
  }

  return loadErrors;
};
