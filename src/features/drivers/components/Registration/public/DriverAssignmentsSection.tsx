import { useContext } from "react";
import { LiveSearchInputField } from "#/ui/LiveSearchInputField/public/LiveSearchInputField/LiveSearchInputField";
import type { Renderable } from "#/types/internal/classes/Renderable";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { Truck } from "#/types/internal/classes/Truck";
import { Trailer } from "#/types/internal/classes/Trailer";
import { Entity } from "#/types/api/common/api-query-types";
import { joinByCompanyId } from "#/utils/api/api-query-utils";
import { Dispatcher } from "#/types/internal/classes/Dispatcher";
import { DriverRegistrationContext } from "#/features/drivers/context/DriverRegistrationContext";

export const DriverAssignmentsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const driverRegistrationError = context.registrationDataError;
  const setDriverRegistrationData = context.setRegistrationData;
  const joinableEntityId = context.joinableEntityId!!;
  return (
    <div className="flex flex-row items-center justify-center gap-x-20">
      <LiveSearchInputField
        label="Dispatcher"
        placeholder={"John Doe"}
        value={
          driverRegistrationData.dispatcherAssignmentData?.name ?? BLANK_STRING
        }
        entityType={Entity.DISPATCHER}
        joinableEntityId={joinableEntityId}
        joinableEntityName="company"
        saveData={(dispatcherData: Renderable) =>
          setDriverRegistrationData((prev) => ({
            ...prev,
            dispatcherAssignmentData: {
              uuid: dispatcherData.getUuid(),
              name: dispatcherData.renderOnForm(),
            },
          }))
        }
        cleanData={() =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            dispatcherAssignmentData: undefined,
          })
        }
        isMandatory={true}
        errorMessage={driverRegistrationError.dispatcher}
        constructor={Dispatcher}
        customSearchCriteria={[joinByCompanyId(joinableEntityId)]}
      />
      <LiveSearchInputField
        label="Truck"
        placeholder={"RK-2021"}
        value={
          driverRegistrationData.truckAssignmentData?.truckNumber ??
          BLANK_STRING
        }
        entityType={Entity.TRUCK}
        joinableEntityId={joinableEntityId}
        joinableEntityName="company"
        saveData={(truckData: Renderable) =>
          setDriverRegistrationData((prev) => ({
            ...prev,
            truckAssignmentData: {
              truckUuid: truckData.getUuid(),
              truckNumber: truckData.renderOnForm(),
            },
          }))
        }
        cleanData={() =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            truckAssignmentData: undefined,
          })
        }
        constructor={Truck}
        customSearchCriteria={[joinByCompanyId(joinableEntityId)]}
      />
      <LiveSearchInputField
        label="Trailer"
        placeholder={"TK-2013"}
        value={
          driverRegistrationData.trailerAssignmentData?.trailerNumber ??
          BLANK_STRING
        }
        entityType={Entity.TRAILER}
        joinableEntityId={joinableEntityId}
        joinableEntityName="company"
        saveData={(trailerData: Renderable) =>
          setDriverRegistrationData((prev) => ({
            ...prev,
            trailerAssignmentData: {
              trailerUuid: trailerData.getUuid(),
              trailerNumber: trailerData.renderOnForm(),
            },
          }))
        }
        cleanData={() =>
          setDriverRegistrationData({
            ...driverRegistrationData,
            trailerAssignmentData: undefined,
          })
        }
        constructor={Trailer}
        customSearchCriteria={[joinByCompanyId(joinableEntityId)]}
      />
    </div>
  );
};
