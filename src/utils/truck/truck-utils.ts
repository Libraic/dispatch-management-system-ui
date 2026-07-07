import { BLANK_STRING } from "#/constants/common/global-constants";
import * as React from "react";
import type {
  TruckRegistrationData,
  TruckRegistrationError,
} from "#/types/internal/truck/truck-registration-types";
import type { CreateTruckRequest } from "#/types/api/truck/truck-api-request-types";

export const getBlankTruckRegistrationErrors = (): TruckRegistrationError => {
  return {
    truckNumber: BLANK_STRING,
    vinNumber: BLANK_STRING,
    truckYear: BLANK_STRING,
    weight: BLANK_STRING,
  };
};

export const setTruckDataField = (
  setTruckData: React.Dispatch<React.SetStateAction<TruckRegistrationData>>,
  field: keyof TruckRegistrationData,
  value: string | number,
) => {
  setTruckData((prev) => ({ ...prev, [field]: value }));
};

// TODO: asdase

export const getCreateTruckRequest = (
  truckData: TruckRegistrationData,
  companyUuid: string,
): CreateTruckRequest => {
  return {
    companyUuid: companyUuid,
    truckNumber: truckData.truckNumber,
    vinNumber: truckData.vinNumber,
    model: truckData.model,
    truckYear: truckData.truckYear,
    truckMake: truckData.truckMake,
    fuelType: truckData.fuelType,
    color: truckData.color,
    weight: truckData.weight,
  };
};
