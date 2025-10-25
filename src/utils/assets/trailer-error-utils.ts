import type {
  TrailerRegistrationData,
  TrailerRegistrationError,
} from "../../types/assets/trailer-data.ts";
import { getBlankTrailerRegistrationErrors } from "./trailer-utils.ts";
import { BLANK_STRING } from "../constants/global-constants.ts";
import {
  EQUIPMENT_SIZE_INVALID,
  EQUIPMENT_TYPE_IS_MANDATORY,
  MAX_WEIGHT_INVALID,
  PALLET_CAPACITY_INVALID,
  TRAILER_NUMBER_IS_MANDATORY,
  TRAILER_YEAR_INVALID,
  VIN_NUMBER_IS_MANDATORY,
} from "../global/error-messages.ts";

export const validateTrailerRegistrationData = (
  data: TrailerRegistrationData,
): TrailerRegistrationError | null => {
  const errors = getBlankTrailerRegistrationErrors();
  let wasErrorFound = false;
  if (data.trailerNumber === BLANK_STRING) {
    errors.trailerNumber = TRAILER_NUMBER_IS_MANDATORY;
    wasErrorFound = true;
  }

  if (data.vinNumber === BLANK_STRING) {
    errors.vinNumber = VIN_NUMBER_IS_MANDATORY;
    wasErrorFound = true;
  }

  if (data.trailerYear <= 0) {
    errors.trailerYear = TRAILER_YEAR_INVALID;
    wasErrorFound = true;
  }

  if (data.equipmentType === BLANK_STRING) {
    errors.equipmentType = EQUIPMENT_TYPE_IS_MANDATORY;
    wasErrorFound = true;
  }

  if (data.equipmentSize <= 0) {
    errors.equipmentSize = EQUIPMENT_SIZE_INVALID;
    wasErrorFound = true;
  }

  if (data.palletCapacity <= 0) {
    errors.palletCapacity = PALLET_CAPACITY_INVALID;
    wasErrorFound = true;
  }

  if (data.maxWeight <= 0) {
    errors.maxWeight = MAX_WEIGHT_INVALID;
    wasErrorFound = true;
  }

  return wasErrorFound ? errors : null;
};
