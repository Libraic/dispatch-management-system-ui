import { TrucksBoardDispatcherRow } from "../internal/TrucksBoardDispatcherRow.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import { TrucksBoardDriverRow } from "../internal/TrucksBoardDriverRow.tsx";
import type {
  DispatcherMileageData,
  MileageData,
} from "../../../../types/internal/trucks-board/trucks-board-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import { upsertDriverMileageCallbackFunction } from "../../../../utils/trucks-board/trucks-board-utils.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOT,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertDriverMileageRequest } from "../../../../types/api/driver-mileage/driver-mileage-api-types.ts";
import { upsertDriverMileage } from "../../../../service/driverMileageService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { TABLE_DELIMITER_BOTTOM_COLOR } from "../../../../tailwind/tailwind-colors-vars.ts";
import { TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER } from "../../../../tailwind/tailwind-border-vars.ts";
import { cleanPhoneNumber } from "../../../../utils/global/input-form-utils.ts";

export const TrucksBoardRowContainer: React.FC<{
  companyId: string;
  days: string[];
  dispatcherMileageData: DispatcherMileageData;
  setDispatcherMileageData: React.Dispatch<
    React.SetStateAction<DispatcherMileageData[]>
  >;
  isLastDispatcher: boolean;
}> = ({
  companyId,
  days,
  dispatcherMileageData,
  setDispatcherMileageData,
  isLastDispatcher,
}) => {
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
      mileageDate: mileageData.pickUpDate.toISOString().split("T")[0],
      revenue: mileageData.revenue ? parseFloat(mileageData.revenue) : ZERO,
      miles: mileageData.miles ? parseFloat(mileageData.miles) : ZERO,
      broker: mileageData.broker,
      representative: mileageData.representative,
      pickUpLocation: mileageData.pickUpLocation,
      deliveryLocation: mileageData.deliveryLocation,
      pickUpDate: mileageData.pickUpDate.toISOString().split("T")[0],
      deliveryDate: mileageData.deliveryDate.toISOString().split("T")[0],
      representativeContactNumber: representativeContactNumber,
    };
    const upsertResponse = await upsertDriverMileage(upsertRequest);

    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const mileageResponses = upsertResponse.data!!.mileage;
    const mileageDataList = mileageResponses.map((mileageResponse) => {
      return {
        revenue: mileageResponse.revenue,
        miles: mileageResponse.miles,
        broker: mileageResponse.broker,
        representative: mileageResponse.representative,
        representativeContactNumber:
          mileageResponse.representativeContactNumber,
        pickUpLocation: mileageResponse.pickUpLocation,
        deliveryLocation: mileageResponse.deliveryLocation,
        pickUpDate: new Date(mileageResponse.pickUpDate),
        deliveryDate: new Date(mileageResponse.deliveryDate),
        loadStatus: mileageResponse.loadStatus,
        date: mileageResponse.date,
      } as MileageData;
    });

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

  const prepareStylesForDispatcher = () => {
    if (
      isLastDispatcher &&
      !activator.isActive() &&
      dispatcherMileageData.dispatcher !== null
    ) {
      return `${TABLE_DELIMITER_THICKNESS_BOTTOM_BORDER} ${TABLE_DELIMITER_BOTTOM_COLOR}`;
    }

    return BLANK_STRING;
  };

  const hasDispatcher = dispatcherMileageData.dispatcher !== null;
  return (
    <div>
      {hasDispatcher && (
        <TrucksBoardDispatcherRow
          days={updatedDays}
          dispatcherMileageData={dispatcherMileageData}
          expander={activator}
          styles={prepareStylesForDispatcher()}
        />
      )}
      {(activator.isActive() || !hasDispatcher) &&
        dispatcherMileageData.driverMileageDataList.map(
          (driverMileageData, index) => (
            <div key={driverMileageData.identifier}>
              <TrucksBoardDriverRow
                days={updatedDays}
                driverMileageData={driverMileageData}
                upsertDriverMileageData={upsertDriverMileageFn}
                hasDispatcher={hasDispatcher}
                postDeleteUpdateFn={postDeleteUpdateFn}
                isLastDriverForDispatcher={
                  index ===
                  dispatcherMileageData.driverMileageDataList.length - 1
                }
                isLastDriver={
                  isLastDispatcher &&
                  index ===
                    dispatcherMileageData.driverMileageDataList.length - 1
                }
              />
            </div>
          ),
        )}
      <ToastRenderer toast={toast} />
    </div>
  );
};
