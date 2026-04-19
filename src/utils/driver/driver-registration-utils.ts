import type { DriverRegistrationData } from "#/types/internal/driver/driver-registration-types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import {
  getFirstCityOfStateByCountryIsoCode,
  getFirstStateOfCountryByIsoCode,
  USA_COUNTRY_ISO_CODE,
} from "#/utils/location/location-utils";
import type { CreateDriverRequest } from "#/types/api/driver/driver-api-request-types";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";

export const documentsStatuses = ["Work Permit", "Green Card", "Citizen"];
export const driverPositions = ["Owner Operator", "Company Driver"];

export const getBlankDriverRegistrationData = (): DriverRegistrationData => {
  return {
    firstName: BLANK_STRING,
    lastName: BLANK_STRING,
    phoneNumber: BLANK_STRING,
    email: BLANK_STRING,
    documentsStatus: documentsStatuses[0],
    position: driverPositions[0],
    state: getFirstStateOfCountryByIsoCode(USA_COUNTRY_ISO_CODE),
    city: getFirstCityOfStateByCountryIsoCode(USA_COUNTRY_ISO_CODE),
    truckAssignmentData: {
      truckNumber: BLANK_STRING,
      truckUuid: BLANK_STRING,
    },
    trailerAssignmentData: {
      trailerNumber: BLANK_STRING,
      trailerUuid: BLANK_STRING,
    },
    dispatcherAssignmentData: {
      uuid: BLANK_STRING,
      name: BLANK_STRING,
    },
  };
};

export const createCreateDriverRequestFromDriverRegistrationData = (
  driverRegistrationData: DriverRegistrationData,
  companyUuid: string,
): CreateDriverRequest => {
  return {
    firstName: driverRegistrationData.firstName,
    lastName: driverRegistrationData.lastName,
    phoneNumber: cleanPhoneNumber(driverRegistrationData.phoneNumber),
    email: driverRegistrationData.email,
    documentsStatus: driverRegistrationData.documentsStatus,
    position: driverRegistrationData.position,
    state: driverRegistrationData.state,
    city: driverRegistrationData.city,
    companyUuid: companyUuid,
    trailerUuid:
      driverRegistrationData.trailerAssignmentData.trailerUuid !== BLANK_STRING
        ? driverRegistrationData.trailerAssignmentData.trailerUuid
        : null,
    truckUuid:
      driverRegistrationData.truckAssignmentData.truckUuid !== BLANK_STRING
        ? driverRegistrationData.truckAssignmentData.truckUuid
        : null,
    dispatcherUuid:
      driverRegistrationData.dispatcherAssignmentData.uuid !== BLANK_STRING
        ? driverRegistrationData.dispatcherAssignmentData.uuid
        : null,
  };
};
