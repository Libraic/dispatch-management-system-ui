import { TrucksBoardDispatcherRow } from "./TrucksBoardDispatcherRow.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import { TrucksBoardDriverRow } from "./TrucksBoardDriverRow.tsx";
import type {
  DispatcherMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import { upsertDriverMileageCallbackFunction } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import {
  BLANK_SPACE,
  DOT,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertDriverMileageRequest } from "../../../../types/api/driver-mileage/driver-mileage-api-types.ts";
import { upsertDriverMileage } from "../../../../service/driverMileageService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";

export const TrucksBoardRowContainer: React.FC<{
  companyId: string;
  days: string[];
  dispatcherMileageData: DispatcherMileageData;
  setDispatcherMileageData: React.Dispatch<
    React.SetStateAction<DispatcherMileageData[]>
  >;
}> = ({ companyId, days, dispatcherMileageData, setDispatcherMileageData }) => {
  const updatedDays = days.map((day) => {
    const datePart = day.split(BLANK_SPACE)[1];
    const dateParts = datePart.split(DOT);
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  });
  const activator = useActivator();
  const dispatcherMileageDataIdentifier = dispatcherMileageData.identifier;
  const toast = useToast();

  const upsertDriverMileageFn = async (
    driver: Driver,
    mileageData: MileageData,
    driverMileageDataIdentifier?: string,
  ) => {
    const upsertRequest: UpsertDriverMileageRequest = {
      driverMileageUuid: driverMileageDataIdentifier ?? undefined,
      companyUuid: companyId,
      dispatcherUuid: dispatcherMileageData.dispatcher!!.getUuid(),
      driverUuid: driver.getUuid(),
      startDate: dispatcherMileageData.startDate,
      endDate: dispatcherMileageData.endDate,
      mileageDate: mileageData.date,
      revenue: parseFloat(mileageData.revenue),
      miles: parseFloat(mileageData.miles),
      broker: mileageData.broker,
      representative: mileageData.representative,
      pickUpLocation: mileageData.pickUpLocation,
      deliveryLocation: mileageData.deliveryLocation,
      pickUpDate: mileageData.pickUpDate.toISOString().split("T")[0],
      deliveryDate: mileageData.deliveryDate.toISOString().split("T")[0],
    };
    const upsertResponse = await upsertDriverMileage(upsertRequest);

    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const currentWeek = updatedDays.slice(0, 7);
    const driverMileageUuid = upsertResponse.data!!.driverMileageUuid;
    setDispatcherMileageData((prevDispatcherMileageDataList) => {
      return upsertDriverMileageCallbackFunction(
        prevDispatcherMileageDataList,
        dispatcherMileageDataIdentifier,
        mileageData,
        driver,
        driverMileageUuid,
        currentWeek,
      );
    });
    activator.activate();
  };

  return dispatcherMileageData.dispatcher !== null ? (
    <div>
      <TrucksBoardDispatcherRow
        days={updatedDays}
        dispatcherMileageData={dispatcherMileageData}
        expander={activator}
      />
      {activator.isActive() &&
        dispatcherMileageData.driverMileageDataList.map((driverMileageData) => (
          <div key={driverMileageData.identifier}>
            <TrucksBoardDriverRow
              days={updatedDays}
              driverMileageData={driverMileageData}
              upsertDriverMileageData={upsertDriverMileageFn}
              hasDispatcher={true}
            />
          </div>
        ))}
      <ToastRenderer toast={toast} />
    </div>
  ) : (
    <div>
      {dispatcherMileageData.driverMileageDataList.map((driverMileageData) => (
        <div key={driverMileageData.identifier}>
          <TrucksBoardDriverRow
            days={updatedDays}
            driverMileageData={driverMileageData}
            upsertDriverMileageData={upsertDriverMileageFn}
            hasDispatcher={false}
          />
        </div>
      ))}
      <ToastRenderer toast={toast} />
    </div>
  );
};
