import { TrucksBoardDispatcherRow } from "../internal/TrucksBoardDispatcherRow.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import { TrucksBoardDriverRow } from "../internal/TrucksBoardDriverRow.tsx";
import type {
  DispatcherMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import {
  fromMileageResponsesToMileageData,
  upsertDriverMileageCallbackFunction,
} from "../../../../utils/trucks-board/trucks-board-utils.ts";
import {
  BLANK_SPACE,
  DOT,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertDriverMileageRequest } from "../../../../types/api/driver-mileage/driver-mileage-api-types.ts";
import { upsertDriverMileage } from "../../../../service/driverMileageService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { cleanPhoneNumber } from "../../../../utils/global/input-form-utils.ts";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { toIsoDate } from "../../../../utils/global/date-utils.ts";

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
    const representativeContactNumber = mileageData.representativeContactNumber
      ? cleanPhoneNumber(mileageData.representativeContactNumber)
      : undefined;
    const upsertRequest: UpsertDriverMileageRequest = {
      driverMileageUuid: driverMileageDataIdentifier ?? undefined,
      companyUuid: companyId,
      dispatcherUuid: dispatcherMileageData.dispatcher!!.getUuid(),
      driverUuid: driver.getUuid(),
      startDate: dispatcherMileageData.startDate,
      endDate: dispatcherMileageData.endDate,
      mileageDate: mileageData.date,
      revenue: mileageData.revenue ? parseFloat(mileageData.revenue) : ZERO,
      miles: mileageData.miles ? parseFloat(mileageData.miles) : ZERO,
      broker: mileageData.broker,
      representative: mileageData.representative,
      representativeContactNumber: representativeContactNumber,
      locations: mileageData.locations.map((location) => ({
        label: location.label,
        date: toIsoDate(location.date),
        location: location.location,
        order: location.order,
      })),
    };
    const upsertResponse = await upsertDriverMileage(upsertRequest);

    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const mileageResponses = upsertResponse.data!!.mileage;
    const mileageDataList = fromMileageResponsesToMileageData(mileageResponses);
    const currentWeek = updatedDays.slice(0, 7);
    const driverMileageUuid = upsertResponse.data!!.driverMileageUuid;
    setDispatcherMileageData((prevDispatcherMileageDataList) => {
      return upsertDriverMileageCallbackFunction(
        prevDispatcherMileageDataList,
        dispatcherMileageDataIdentifier,
        mileageDataList,
        driver,
        currentWeek,
        driverMileageUuid,
      );
    });
    activator.activate();
  };

  const postDeleteUpdateFn = (
    driver: Driver,
    mileageData: MileageData[],
    driverMileageUuid?: string,
  ) => {
    const currentWeek = updatedDays.slice(0, 7);
    setDispatcherMileageData((prevDispatcherMileageDataList) => {
      return upsertDriverMileageCallbackFunction(
        prevDispatcherMileageDataList,
        dispatcherMileageDataIdentifier,
        mileageData,
        driver,
        currentWeek,
        driverMileageUuid,
      );
    });
  };

  const hasDispatcher = dispatcherMileageData.dispatcher !== null;
  return (
    <div>
      {hasDispatcher && (
        <TrucksBoardDispatcherRow
          dispatcherMileageData={dispatcherMileageData}
          expander={activator}
        />
      )}
      {(activator.isActive() || !hasDispatcher) &&
        dispatcherMileageData.driverMileageDataList.map((driverMileageData) => (
          <div key={driverMileageData.identifier ?? generateUuid()}>
            <TrucksBoardDriverRow
              days={updatedDays}
              driverMileageData={driverMileageData}
              upsertDriverMileageData={upsertDriverMileageFn}
              hasDispatcher={hasDispatcher}
              postDeleteUpdateFn={postDeleteUpdateFn}
            />
          </div>
        ))}
      <ToastRenderer toast={toast} />
    </div>
  );
};
