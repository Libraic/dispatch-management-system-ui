import type { DriverRegistrationData } from "#/features/drivers/components/Registration/types/driverRegistration.types";
import type { CreateDriverRequest } from "#/features/drivers/api/api.types";
import { cleanPhoneNumber } from "#/shared/utils/inputField.utils";

export const documentsStatuses = ["Work Permit", "Green Card", "Citizen"];
export const driverPositions = ["Company Driver", "Owner Operator"];

export const createCreateDriverRequestFromDriverRegistrationData = (
  driverRegistrationData: DriverRegistrationData,
  companyUuid: string,
): CreateDriverRequest => {
  return {
    firstName: driverRegistrationData.firstName,
    lastName: driverRegistrationData.lastName,
    phoneNumber: driverRegistrationData.phoneNumber
      ? cleanPhoneNumber(driverRegistrationData.phoneNumber)
      : undefined,
    email: driverRegistrationData.email,
    documentsStatus: driverRegistrationData.documentsStatus,
    position: driverRegistrationData.position,
    location: driverRegistrationData.location,
    companyUuid: companyUuid,
    trailerUuid: driverRegistrationData.trailerAssignmentData?.trailerUuid,
    truckUuid: driverRegistrationData.truckAssignmentData?.truckUuid,
    dispatcherUuid: driverRegistrationData.dispatcherAssignmentData?.uuid,
  };
};
