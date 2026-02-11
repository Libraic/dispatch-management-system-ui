import {
  DISPATCHER_KEY,
  type DriverMileageErrors,
  type DriversMileageGroupsErrors,
} from "../../types/internal/trucks-board/trucks-board-old-types.ts";

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
