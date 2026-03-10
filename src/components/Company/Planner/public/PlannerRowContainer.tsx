import { PlannerDispatcherRow } from "../internal/PlannerDispatcherRow.tsx";
import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import { PlannerDriverRow } from "../internal/PlannerDriverRow.tsx";
import type {
  DispatcherLoadData,
  LoadData,
} from "../../../../types/internal/planner/planner-types.ts";
import type { Driver } from "../../../../types/internal/classes/Driver.ts";
import {
  fromLoadResponsesToLoadData,
  upsertDriverLoadCallbackFunction,
} from "../../../../utils/planner/planner-utils.ts";
import {
  BLANK_SPACE,
  DOT,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertLoadRequest } from "../../../../types/api/loads/load-api-types.ts";
import { upsertLoad } from "../../../../service/loadsService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import { cleanPhoneNumber } from "../../../../utils/global/input-form-utils.ts";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { toIsoDate } from "../../../../utils/global/date-utils.ts";

export const PlannerRowContainer: React.FC<{
  companyId: string;
  days: string[];
  dispatcherLoadData: DispatcherLoadData;
  setDispatcherLoadData: React.Dispatch<
    React.SetStateAction<DispatcherLoadData[]>
  >;
}> = ({ companyId, days, dispatcherLoadData, setDispatcherLoadData }) => {
  const updatedDays = days.map((day) => {
    const datePart = day.split(BLANK_SPACE)[1];
    const dateParts = datePart.split(DOT);
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  });
  const activator = useActivator();
  const dispatcherLoadIdentifier = dispatcherLoadData.identifier;
  const toast = useToast();

  const upsertLoadFn = async (
    driver: Driver,
    loadData: LoadData,
    driverLoadIdentifier?: string,
  ) => {
    const representativeContactNumber = loadData.representativeContactNumber
      ? cleanPhoneNumber(loadData.representativeContactNumber)
      : undefined;
    const upsertRequest: UpsertLoadRequest = {
      loadUuid: driverLoadIdentifier,
      companyUuid: companyId,
      dispatcherUuid: dispatcherLoadData.dispatcher!!.getUuid(),
      driverUuid: driver.getUuid(),
      startDate: dispatcherLoadData.startDate,
      endDate: dispatcherLoadData.endDate,
      loadDate: loadData.date,
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

    const loadResponses = upsertResponse.data!!.loads;
    const loadDataList = fromLoadResponsesToLoadData(loadResponses);
    const currentWeek = updatedDays.slice(0, 7);
    const loadUuid = upsertResponse.data!!.loadUuid;
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return upsertDriverLoadCallbackFunction(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        loadDataList,
        driver,
        currentWeek,
        loadUuid,
      );
    });
    activator.activate();
  };

  const postDeleteUpdateFn = (
    driver: Driver,
    loadDataList: LoadData[],
    loadUuid?: string,
  ) => {
    const currentWeek = updatedDays.slice(0, 7);
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return upsertDriverLoadCallbackFunction(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        loadDataList,
        driver,
        currentWeek,
        loadUuid,
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
          <div key={driverLoad.identifier ?? generateUuid()}>
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
