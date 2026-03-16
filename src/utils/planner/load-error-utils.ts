import type {
  LoadData,
  LoadDataError,
  LoadLocationError,
} from "../../types/internal/planner/planner-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import { validatePhoneNumber } from "../registration/registration-utils.ts";
import { cleanPhoneNumber } from "../global/input-form-utils.ts";
import { LOCATION_REQUIRED } from "../../constants/error/error-message-constants.ts";

export const getBlankLoadDataError = (): LoadDataError => {
  return {
    revenueError: BLANK_STRING,
    milesError: BLANK_STRING,
    brokerError: BLANK_STRING,
    pickUpLocationError: BLANK_STRING,
    deliveryLocationError: BLANK_STRING,
    representativeContactNumberError: BLANK_STRING,
    locationsErrors: new Map<string, LoadLocationError>(),
  };
};

export const getErrorsIfPresent = (loadData: LoadData) => {
  let isError = false;
  const loadErrors: LoadDataError = getBlankLoadDataError();
  if (loadData.revenue === BLANK_STRING) {
    isError = true;
    loadErrors.revenueError = "Revenue is required.";
  }
  if (loadData.miles === BLANK_STRING) {
    isError = true;
    loadErrors.milesError = "Miles are required.";
  }
  if (loadData.broker === BLANK_STRING) {
    isError = true;
    loadErrors.brokerError = "Broker is required.";
  }

  const representativeContactNumber = loadData.representativeContactNumber
    ? cleanPhoneNumber(loadData.representativeContactNumber)
    : BLANK_STRING;
  const representativeContactNumberValidation = validatePhoneNumber(
    representativeContactNumber,
    "optional",
  );
  if (representativeContactNumberValidation !== BLANK_STRING) {
    isError = true;
    loadErrors.representativeContactNumberError =
      representativeContactNumberValidation;
  }

  const locationErrors = new Map<string, LoadLocationError>();
  for (let i = 0; i < loadData.locations.length; i++) {
    const currentLocation = loadData.locations[i];
    const locationError = getBlankLocationError();
    if (i > 0 && currentLocation.date < loadData.locations[i - 1].date) {
      isError = true;
      locationError.dateError = "Locations must be in chronological order.";
    }
    if (currentLocation.location === BLANK_STRING) {
      isError = true;
      locationError.locationError = LOCATION_REQUIRED;
    }
    locationErrors.set(currentLocation.uuid, locationError);
  }

  loadErrors.locationsErrors = locationErrors;
  return { isError, loadErrors: loadErrors };
};

const getBlankLocationError = (): LoadLocationError => {
  return {
    locationError: BLANK_STRING,
    dateError: BLANK_STRING,
  };
};
