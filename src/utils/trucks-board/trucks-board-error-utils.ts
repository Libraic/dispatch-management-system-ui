import type {
  MileageData,
  MileageDataError,
} from "../../types/internal/trucks-board/trucks-board-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import { validatePhoneNumber } from "../registration/registration-utils.ts";
import { cleanPhoneNumber } from "../global/input-form-utils.ts";

export const getBlankMileageDataError = (): MileageDataError => {
  return {
    revenueError: BLANK_STRING,
    milesError: BLANK_STRING,
    brokerError: BLANK_STRING,
    pickUpLocationError: BLANK_STRING,
    deliveryLocationError: BLANK_STRING,
    representativeContactNumberError: BLANK_STRING,
  };
};

export const getErrorsIfPresent = (mileageData: MileageData) => {
  let isError = false;
  const mileageErrors: MileageDataError = getBlankMileageDataError();
  if (mileageData.revenue === BLANK_STRING) {
    isError = true;
    mileageErrors.revenueError = "Revenue is required.";
  }
  if (mileageData.miles === BLANK_STRING) {
    isError = true;
    mileageErrors.milesError = "Miles are required.";
  }
  if (mileageData.broker === BLANK_STRING) {
    isError = true;
    mileageErrors.brokerError = "Broker is required.";
  }

  const representativeContactNumber = mileageData.representativeContactNumber
    ? cleanPhoneNumber(mileageData.representativeContactNumber)
    : BLANK_STRING;
  const representativeContactNumberValidation = validatePhoneNumber(
    representativeContactNumber,
    "optional",
  );
  if (representativeContactNumberValidation !== BLANK_STRING) {
    isError = true;
    mileageErrors.representativeContactNumberError =
      representativeContactNumberValidation;
  }

  return { isError, mileageErrors };
};
