import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "../../types/assets/trailer-data.ts";
import { getBlankTruckRegistrationErrors } from "./truck-utils.ts";
import { BLANK_STRING } from "../constants/global-constants.ts";
import {
  TRUCK_NUMBER_IS_MANDATORY,
  TRUCK_WEIGHT_INVALID,
  TRUCK_YEAR_INVALID,
  VIN_NUMBER_IS_MANDATORY,
} from "../global/error-messages.ts";

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

  if (data.truckYear <= 0) {
    errors.truckYear = TRUCK_YEAR_INVALID;
    wasErrorFound = true;
  }

  if (data.weight <= 0) {
    errors.weight = TRUCK_WEIGHT_INVALID;
    wasErrorFound = true;
  }

  return wasErrorFound ? errors : null;
};
