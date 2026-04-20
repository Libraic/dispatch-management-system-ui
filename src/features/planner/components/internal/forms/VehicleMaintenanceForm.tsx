import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import type {
  CalendarBookFormHandler,
  DriverWorkforce,
  SchedulableFormProps,
  SubmitSuccess,
  VehicleMaintenanceData,
  VehicleMaintenanceErrors,
} from "#/types/internal/planner/planner-types";
import { LiveSearchInputField } from "#/ui/LiveSearchInputField/public/LiveSearchInputField/LiveSearchInputField";
import type { Renderable } from "#/types/internal/classes/Renderable";
import { Entity } from "#/types/api/common/api-query-types";
import { City } from "#/types/internal/classes/City";
import { DateSelectorField } from "#/ui/Selectors/DateSelectorField";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { DispatchingContext } from "#/context/DispatchingContext";
import { getBlankVehicleMaintenanceData } from "#/utils/planner/vehicle-maintenance-utils";
import { LOCATION_REQUIRED } from "#/features/planner/constants/validationMessages.constants";

const getInitialData = (
  workforce: DriverWorkforce,
  id?: string,
  day?: string,
) => {
  if (!id) {
    return getBlankVehicleMaintenanceData(day);
  }

  return workforce.vehicleMaintenanceRecords.filter(
    (vehicleMaintenanceRecord) => vehicleMaintenanceRecord.id === id,
  )[0];
};

export const VehicleMaintenanceForm = forwardRef<
  CalendarBookFormHandler,
  SchedulableFormProps
>((vehicleMaintenanceProps, ref) => {
  const { workforce, day, id } = vehicleMaintenanceProps;
  const [shopErrors, setShopErrors] = useState<VehicleMaintenanceErrors>({});
  const [shopData, setShopData] = useState<VehicleMaintenanceData>(
    getInitialData(workforce, id, day),
  );
  const context = useContext(DispatchingContext);
  const submit = async (): Promise<SubmitSuccess> => {
    if (shopData.location === BLANK_STRING) {
      setShopErrors({ locationError: LOCATION_REQUIRED });
      return "stay-open";
    }

    const errorMessage = await context!!.upsertVehicleMaintenanceRecordFn(
      shopData,
      workforce.driver.uuid,
      workforce.relationId,
    );

    if (errorMessage) {
      throw new Error(errorMessage);
    }

    return "close-modal";
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <LiveSearchInputField
        label="Location"
        placeholder="Los Angeles, CA"
        value={shopData.location}
        saveData={(city: Renderable) => {
          setShopData((prevShopData) => ({
            ...prevShopData,
            location: city.renderOnForm(),
          }));
        }}
        entityType={Entity.CITY}
        constructor={City}
        isMandatory={true}
        errorMessage={shopErrors?.locationError}
        tailwindProperties={{ width: "w-[14.2rem]" }}
      />
      <div className="flex flex-row gap-x-5">
        <DateSelectorField
          label="Start Date"
          setDate={(date: Date) => {
            setShopData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
          date={shopData.startDate}
        />
        <DateSelectorField
          label="End Date"
          setDate={(date: Date) => {
            setShopData((prevData) => ({
              ...prevData,
              endDate: date,
            }));
          }}
          date={shopData.endDate}
        />
      </div>
    </div>
  );
});
