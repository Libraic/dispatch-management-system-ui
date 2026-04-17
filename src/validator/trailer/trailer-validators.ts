import type {
  TrailerRegistrationData,
  TrailerRegistrationError,
} from "#/types/internal/trailer/trailer-registration-types";
import { getBlankTrailerRegistrationErrors } from "#/utils/trailer/trailer-utils";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  EQUIPMENT_SIZE_INVALID,
  EQUIPMENT_TYPE_IS_MANDATORY,
  MAX_WEIGHT_INVALID,
  PALLET_CAPACITY_INVALID,
  TRAILER_NUMBER_IS_MANDATORY,
  TRAILER_YEAR_INVALID,
  VIN_NUMBER_IS_MANDATORY,
} from "#/constants/error/error-message-constants";

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
