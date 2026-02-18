import {
  DISPATCHER_KEY,
  type DriverMileageErrors,
  type DriversMileageGroupsErrors,
} from "../../types/internal/trucks-board/trucks-board-old-types.ts";
import type {
  MileageData,
  MileageDataError,
} from "../../types/internal/trucks-board/trucks-board-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const getDispatcherErrorMessage = (
  errors: DriversMileageGroupsErrors,
  groupIdentifier: string,
) => {
  return (
    errors &&
    errors[groupIdentifier] &&
    (errors[groupIdentifier][DISPATCHER_KEY] as string)
  );
};

export const getDriverMileageErrorsByGroupIdentifier = (
  errors: DriversMileageGroupsErrors,
  groupIdentifier: string,
) => {
  return errors && (errors[groupIdentifier] as DriverMileageErrors);
};

export const getBlankMileageDataError = (): MileageDataError => {
  return {
    revenueError: BLANK_STRING,
    milesError: BLANK_STRING,
    brokerError: BLANK_STRING,
    pickUpLocationError: BLANK_STRING,
    deliveryLocationError: BLANK_STRING,
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
  if (mileageData.pickUpLocation === BLANK_STRING) {
    isError = true;
    mileageErrors.pickUpLocationError = "Select a pick-up location.";
  }
  if (mileageData.deliveryLocation === BLANK_STRING) {
    isError = true;
    mileageErrors.deliveryLocationError = "Select a delivery location.";
  }

  return { isError, mileageErrors };
};
