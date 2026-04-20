import type {
  LoadData,
  LoadDataError,
  LoadLocationError,
} from "#/types/internal/planner/planner-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { validatePhoneNumber } from "#/utils/registration/registration-utils";
import {
  BROKER_REQUIRED_ERROR,
  LOAD_NUMBER_REQUIRED_ERROR,
  LOCATION_REQUIRED,
  LOCATIONS_CHRONOLOGICAL_ORDER_ERROR,
  MILES_REQUIRED_ERROR,
  REVENUE_REQUIRED_ERROR,
} from "#/constants/error/error-message-constants";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";

export const getErrorsIfPresent = (loadData: LoadData) => {
  const loadErrors: LoadDataError = {};

  if (loadData.loadNumber === BLANK_STRING) {
    loadErrors.loadNumberError = LOAD_NUMBER_REQUIRED_ERROR;
  }
  if (loadData.revenue === BLANK_STRING) {
    loadErrors.revenueError = REVENUE_REQUIRED_ERROR;
  }
  if (loadData.loadedMiles === BLANK_STRING) {
    loadErrors.loadedMilesError = MILES_REQUIRED_ERROR;
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
