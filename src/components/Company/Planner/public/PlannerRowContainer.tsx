import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import type {
  DispatcherLoadData,
  LoadData,
} from "../../../../types/internal/planner/planner-types.ts";
import {
  BLANK_SPACE,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertLoadRequest } from "../../../../types/api/loads/load-api-types.ts";
import { upsertLoad } from "../../../../service/loadsService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { cleanPhoneNumber } from "../../../../utils/global/input-form-utils.ts";
import { toIsoDate } from "../../../../utils/global/date-utils.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import {
  fromApiLoadLocationToLoadLocationData,
  updateLoadsAfterDeletions,
  upsertDriverLoadCallbackFunction,
} from "../../../../utils/planner/planner-utils.ts";
import { PlannerDispatcherRow } from "../internal/PlannerDispatcherRow.tsx";
import { PlannerDriverRow } from "../internal/PlannerDriverRow.tsx";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";

export const PlannerRowContainer: React.FC<{
  companyId: string;
  days: string[];
  dispatcherLoadData: DispatcherLoadData;
  setDispatcherLoadData: React.Dispatch<
    React.SetStateAction<DispatcherLoadData[]>
  >;
}> = ({ companyId, days, dispatcherLoadData, setDispatcherLoadData }) => {
  const updatedDays = days.map((day) => day.split(BLANK_SPACE)[1]);
  const activator = useActivator();
  const dispatcherLoadIdentifier = dispatcherLoadData.identifier;
  const toast = useToast();

  const upsertLoadFn = async (driver: DriverData, loadData: LoadData) => {
    const representativeContactNumber = loadData.representativeContactNumber
      ? cleanPhoneNumber(loadData.representativeContactNumber)
      : undefined;
    const upsertRequest: UpsertLoadRequest = {
      loadUuid: loadData.id,
      companyUuid: companyId,
      dispatcherUuid: dispatcherLoadData.dispatcher!!.uuid,
      driverUuid: driver.uuid,
      revenue: loadData.revenue ? parseFloat(loadData.revenue) : ZERO,
      miles: loadData.miles ? parseFloat(loadData.miles) : ZERO,
      broker: loadData.broker,
      representative: loadData.representative,
      representativeContactNumber: representativeContactNumber,
      locations: loadData.locations.map((location) => ({
        label: location.label,
        date: toIsoDate(location.date),
        location: location.location,
        order: location.order,
      })),
    };
    const upsertResponse = await upsertLoad(upsertRequest);

    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const loadResponse = upsertResponse.data!!;
    const upsertedLoadData: LoadData = {
      id: loadResponse.loadUuid,
      revenue: `${loadResponse.revenue}`,
      miles: `${loadResponse.miles}`,
      broker: loadResponse.broker,
      representative: loadResponse.representative ?? undefined,
      representativeContactNumber:
        loadResponse.representativeContactNumber ?? undefined,
      loadStatus: loadResponse.loadStatus,
      startDate: loadResponse.startDate,
      endDate: loadResponse.endDate,
      locations: loadResponse.locations.map((location) =>
        fromApiLoadLocationToLoadLocationData(location),
      ),
    };

    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return upsertDriverLoadCallbackFunction(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        upsertedLoadData,
        driver,
      );
    });
    activator.activate();
  };

  const postDeleteUpdateFn = (driver: DriverData, loadDataList: LoadData[]) => {
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return updateLoadsAfterDeletions(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        loadDataList,
        driver,
      );
    });
  };

  const hasDispatcher = dispatcherLoadData.dispatcher !== null;
  return (
    <div>
      {hasDispatcher && (
        <PlannerDispatcherRow
          dispatcherLoadData={dispatcherLoadData}
          expander={activator}
        />
      )}
      {(activator.isActive() || !hasDispatcher) &&
        dispatcherLoadData.driverLoads.map((driverLoad) => (
          <div key={driverLoad.relationId ?? generateUuid()}>
            <PlannerDriverRow
              days={updatedDays}
              driverLoadData={driverLoad}
              upsertDriverLoadData={upsertLoadFn}
              hasDispatcher={hasDispatcher}
              postDeleteUpdateFn={postDeleteUpdateFn}
            />
          </div>
        ))}
      <ToastRenderer toast={toast} />
    </div>
  );
};
