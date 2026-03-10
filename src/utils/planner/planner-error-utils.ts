import type {
  LoadData,
  LoadDataError,
} from "../../types/internal/planner/planner-types.ts";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";
import { validatePhoneNumber } from "../registration/registration-utils.ts";
import { cleanPhoneNumber } from "../global/input-form-utils.ts";

export const getBlankLoadDataError = (): LoadDataError => {
  return {
    revenueError: BLANK_STRING,
    milesError: BLANK_STRING,
    brokerError: BLANK_STRING,
    pickUpLocationError: BLANK_STRING,
    deliveryLocationError: BLANK_STRING,
    representativeContactNumberError: BLANK_STRING,
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

  return { isError, loadErrors: loadErrors };
};
