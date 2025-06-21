import type {
  FieldError,
  ItemError,
  RegistrationDataError,
  WorkloadData,
} from "../types/registration/registration-data.ts";
import { BLANK_STRING } from "./global-constants.ts";

export const getSimpleErrorMessageFromRegistrationDataError = (
  itemErrors: ItemError[],
) => {
  if (!itemErrors) {
    return BLANK_STRING;
  }

  const fieldErrors: FieldError[] = itemErrors[0].fieldErrors;
  if (!fieldErrors) {
    return BLANK_STRING;
  }

  return fieldErrors[0].errorMessage;
};

export const getWorkloadCompanyErrorMessage = (
  registrationDataError: RegistrationDataError,
  workload: WorkloadData,
) => {
  if (registrationDataError.workloads.length === 0) {
    return BLANK_STRING;
  }

  const itemsErrors: ItemError[] = registrationDataError.workloads.filter(
    (w) => w.id === workload.workloadId,
  );

  if (itemsErrors.length === 0) {
    return BLANK_STRING;
  }

  const field = itemsErrors[0].fieldErrors.filter(
    (fieldError) => fieldError.field === "company",
  )[0];

  return field.errorMessage;
};
