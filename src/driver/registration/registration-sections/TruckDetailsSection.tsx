import { useContext } from "react";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";
import { LiveSearchInputForm } from "../../../global/live-search/LiveSearchInputForm.tsx";
import { LiveSearchKey } from "../../../types/forms.ts";
import type { Renderable } from "../../../types/api/Renderable.ts";
import { BLANK_STRING } from "../../../utils/constants/global-constants.ts";
import { Truck } from "../../../types/api/Truck.ts";
import { Trailer } from "../../../types/api/Trailer.ts";

export const TruckDetailsSection = () => {
  const context = useContext(DriverRegistrationContext)!;
  const driverRegistrationData = context.registrationData;
  const setDriverRegistrationData = context.setRegistrationData;
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-x-20">
        <LiveSearchInputForm
          label="Truck"
          placeholder={"RK-2021"}
          value={driverRegistrationData.truckAssignmentData.truckNumber}
          searchKey={LiveSearchKey.TRUCK}
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
              truckAssignmentData: {
                truckNumber: BLANK_STRING,
                truckUuid: BLANK_STRING,
              },
            })
          }
          constructor={Truck}
        />
        <LiveSearchInputForm
          label="Trailer"
          placeholder={"TK-2013"}
          value={driverRegistrationData.trailerAssignmentData.trailerNumber}
          searchKey={LiveSearchKey.TRAILER}
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
              trailerAssignmentData: {
                trailerUuid: BLANK_STRING,
                trailerNumber: BLANK_STRING,
              },
            })
          }
          constructor={Trailer}
        />
      </div>
    </div>
  );
};
