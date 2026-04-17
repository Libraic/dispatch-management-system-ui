import { BLANK_STRING } from "#/constants/common/global-constants";
import * as React from "react";
import {
  type TrailerRegistrationData,
  type TrailerRegistrationError,
} from "#/types/internal/trailer/trailer-registration-types";
import type { CreateTrailerRequest } from "#/types/api/trailer/trailer-api-request-types";

export const getBlankTrailerRegistrationData = () => {
  return {
    trailerNumber: BLANK_STRING,
    vinNumber: BLANK_STRING,
    trailerYear: new Date().getFullYear(),
    trailerMake: BLANK_STRING,
    equipmentType: BLANK_STRING,
    equipmentSize: 1,
    palletCapacity: 1,
    maxWeight: 1,
    tireSize: BLANK_STRING,
  };
};

export const getBlankTrailerRegistrationErrors =
  (): TrailerRegistrationError => {
    return {
      trailerNumber: BLANK_STRING,
      vinNumber: BLANK_STRING,
      trailerYear: BLANK_STRING,
      equipmentSize: BLANK_STRING,
      equipmentType: BLANK_STRING,
      palletCapacity: BLANK_STRING,
      maxWeight: BLANK_STRING,
    };
  };

export const setTrailerDataField = (
  setTrailerData: React.Dispatch<React.SetStateAction<TrailerRegistrationData>>,
  field: keyof TrailerRegistrationData,
  value: string | number,
) => {
  setTrailerData((prev) => ({ ...prev, [field]: value }));
};

export const getCreateTrailerRequest = (
  trailerData: TrailerRegistrationData,
  companyUuid: string,
): CreateTrailerRequest => {
  return {
    companyUuid: companyUuid,
    trailerNumber: trailerData.trailerNumber,
    vinNumber: trailerData.vinNumber,
    trailerYear: trailerData.trailerYear,
    trailerMake: trailerData.trailerMake,
    equipmentType: trailerData.equipmentType,
    equipmentSize: trailerData.equipmentSize,
    palletCapacity: trailerData.palletCapacity,
    maxWeight: trailerData.maxWeight,
    tireSize: trailerData.tireSize,
  };
};
