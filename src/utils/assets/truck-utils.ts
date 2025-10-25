import { BLANK_STRING } from "../constants/global-constants.ts";
import {
  type CreateTruckRequest,
  type TruckRegistrationData,
  type TruckRegistrationError,
} from "../../types/assets/trailer-data.ts";
import * as React from "react";

export const getBlankTruckRegistrationData = () => {
  return {
    truckNumber: BLANK_STRING,
    vinNumber: BLANK_STRING,
    model: BLANK_STRING,
    truckYear: new Date().getFullYear(),
    truckMake: BLANK_STRING,
    fuelType: BLANK_STRING,
    color: BLANK_STRING,
    weight: 1,
  };
};

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
