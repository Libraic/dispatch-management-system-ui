import { getBlankTruckRegistrationErrors } from "#/utils/truck/truck-utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  TRUCK_NUMBER_IS_MANDATORY,
  TRUCK_WEIGHT_INVALID,
  TRUCK_YEAR_INVALID,
  VIN_NUMBER_IS_MANDATORY,
} from "#/constants/error/error-message-constants";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "#/types/internal/truck/truck-registration-types";

export const validateTruckRegistrationData = (
  data: TruckRegistrationData,
): TruckRegistrationError | null => {
  const errors = getBlankTruckRegistrationErrors();
  let wasErrorFound = false;
  if (data.truckNumber === BLANK_STRING) {
    errors.truckNumber = TRUCK_NUMBER_IS_MANDATORY;
    wasErrorFound = true;
  }

  if (data.vinNumber === BLANK_STRING) {
    errors.vinNumber = VIN_NUMBER_IS_MANDATORY;
    wasErrorFound = true;
  }

  if (data.truckYear && parseInt(data.truckYear) <= 0) {
    errors.truckYear = TRUCK_YEAR_INVALID;
    wasErrorFound = true;
  }

  if (data.weight && parseInt(data.weight) <= 0) {
    errors.weight = TRUCK_WEIGHT_INVALID;
    wasErrorFound = true;
  }

  return wasErrorFound ? errors : null;
};
