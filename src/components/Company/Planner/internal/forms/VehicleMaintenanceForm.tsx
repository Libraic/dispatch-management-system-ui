import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import type {
  CalendarBookFormHandler,
  DriverWorkforce,
  FormProps,
  PlannerError,
  VehicleMaintenanceData,
  VehicleMaintenanceErrors,
} from "../../../../../types/internal/planner/planner-types.ts";
import { LiveSearchInputForm } from "../../../../Common/LiveSearch/public/LiveSearchInputForm.tsx";
import type { Renderable } from "../../../../../types/internal/classes/Renderable.ts";
import { Entity } from "../../../../../types/api/common/api-query-types.ts";
import { City } from "../../../../../types/internal/classes/City.ts";
import { DateSelector } from "../../../../Common/Selector/DateSelector.tsx";
import { BLANK_STRING } from "../../../../../constants/common/global-constants.ts";
import { LOCATION_REQUIRED } from "../../../../../constants/error/error-message-constants.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { getBlankVehicleMaintenanceData } from "../../../../../utils/planner/vehicle-maintenance-utils.ts";

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
  FormProps
>((vehicleMaintenanceProps, ref) => {
  const { workforce, day, id } = vehicleMaintenanceProps;
  const [shopErrors, setShopErrors] = useState<VehicleMaintenanceErrors>({});
  const [shopData, setShopData] = useState<VehicleMaintenanceData>(
    getInitialData(workforce, id, day),
  );
  const context = useContext(DispatchingContext);
  const submit = async () => {
    if (shopData.location === BLANK_STRING) {
      setShopErrors({ locationError: LOCATION_REQUIRED });
      return {
        type: "InternalError",
      } as PlannerError;
    }

    const errorMessage = await context!!.upsertVehicleMaintenanceRecordFn(
      shopData,
      workforce.driver.uuid,
      workforce.relationId,
    );
    return {
      type: "ApiError",
      message: errorMessage ?? undefined,
    } as PlannerError;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <LiveSearchInputForm
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
        <DateSelector
          label="Start Date"
          setDate={(date: Date) => {
            setShopData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
          date={shopData.startDate}
        />
        <DateSelector
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
