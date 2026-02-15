import {
  DISPATCHER_KEY,
  type DriverMileageErrors,
  type DriversMileageGroupsErrors,
} from "../../types/internal/trucks-board/trucks-board-old-types.ts";
import type { MileageDataError } from "../../types/internal/trucks-board/trucks-board-types.ts";
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
  };
};
