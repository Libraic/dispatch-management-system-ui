import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import type {
  DaysOffPeriodData,
  DispatcherPlanningData,
  LoadData,
  VehicleMaintenanceData,
} from "../../../../types/internal/planner/planner-types.ts";
import {
  BLANK_SPACE,
  ZERO,
} from "../../../../constants/common/global-constants.ts";
import type { UpsertLoadRequest } from "../../../../types/api/loads/load-api-types.ts";
import { upsertLoad } from "../../../../service/loadService.ts";
import { useToast } from "../../../../hooks/useToast.ts";
import { cleanPhoneNumber } from "../../../../utils/global/input-form-utils.ts";
import {
  toIsoDate,
  toNormalizedIsoDate,
} from "../../../../utils/global/date-utils.ts";
import type { DriverData } from "../../../../types/api/driver/driver-api-response-types.ts";
import { PlannerDispatcherRow } from "../internal/PlannerDispatcherRow.tsx";
import { PlannerDriverRow } from "../internal/PlannerDriverRow.tsx";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import type { UpsertVehicleMaintenanceRecordRequest } from "../../../../types/api/vehicle-maintenance/vehicle-maintenance-api-request-types.ts";
import { upsertVehicleMaintenanceRecord } from "../../../../service/vehicleMaintenanceService.ts";
import { PlanningContext } from "../../../../context/PlanningContext.ts";
import type { UpsertDayOffPeriodRequest } from "../../../../types/api/days-off/days-off-api-request-types.ts";
import { upsertDaysOffPeriod } from "../../../../service/daysOffService.ts";
import type { PlanningContextData } from "../../../../context/PlanningContextData.ts";
import {
  fromApiLoadLocationToLoadLocationData,
  updateLoadsAfterDeletions,
  upsertDriverLoadCallbackFunction,
} from "../../../../utils/planner/load-utils.ts";
import {
  changeWorkforceVehicleMaintenanceData,
  updateVehicleMaintenanceDataAfterDeletion,
} from "../../../../utils/planner/vehicle-maintenance-utils.ts";
import {
  changeDaysOffPeriodData,
  updateDaysOffPeriodsAfterDeletions,
} from "../../../../utils/planner/days-off-utils.ts";

export const PlannerRow: React.FC<{
  companyId: string;
  days: string[];
  dispatcherPlanningData: DispatcherPlanningData;
  setDispatcherLoadData: React.Dispatch<
    React.SetStateAction<DispatcherPlanningData[]>
  >;
}> = ({ companyId, days, dispatcherPlanningData, setDispatcherLoadData }) => {
  const updatedDays = days.map((day) => day.split(BLANK_SPACE)[1]);
  const activator = useActivator(true);
  const dispatcherLoadIdentifier = dispatcherPlanningData.identifier;
  const toast = useToast();

  const upsertLoadFn = async (driver: DriverData, loadData: LoadData) => {
    const representativeContactNumber = loadData.representativeContactNumber
      ? cleanPhoneNumber(loadData.representativeContactNumber)
      : undefined;
    const upsertRequest: UpsertLoadRequest = {
      loadUuid: loadData.id,
      companyUuid: companyId,
      dispatcherUuid: dispatcherPlanningData.dispatcher!!.uuid,
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
      startDate: toNormalizedIsoDate(loadResponse.startDate),
      endDate: toNormalizedIsoDate(loadResponse.endDate),
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
  };

  const upsertVehicleMaintenanceRecordFn = async (
    vehicleMaintenanceData: VehicleMaintenanceData,
    driverId: string,
    relationId: string,
  ) => {
    const request: UpsertVehicleMaintenanceRecordRequest = {
      relationId: relationId,
      location: vehicleMaintenanceData.location,
      startDate: vehicleMaintenanceData.startDate,
      endDate: vehicleMaintenanceData.endDate,
    };

    const upsertResponse = await upsertVehicleMaintenanceRecord(request);
    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const data = upsertResponse.data!!;
    const newVehicleMaintenanceData: VehicleMaintenanceData = {
      id: data.vehicleMaintenanceRecordUuid,
      location: data.location,
      startDate: toNormalizedIsoDate(data.startDate),
      endDate: toNormalizedIsoDate(data.endDate),
    };
    setDispatcherLoadData((prevDispatcherLoadDataList) =>
      changeWorkforceVehicleMaintenanceData(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        driverId,
        newVehicleMaintenanceData,
      ),
    );
  };

  const upsertDaysOffPeriodFn = async (
    daysOffPeriodData: DaysOffPeriodData,
    driverId: string,
    relationId: string,
  ) => {
    const request: UpsertDayOffPeriodRequest = {
      relationId: relationId,
      startDate: daysOffPeriodData.startDate,
      endDate: daysOffPeriodData.endDate,
    };

    const upsertResponse = await upsertDaysOffPeriod(request);
    if (upsertResponse.error) {
      toast.withErrorMessage(upsertResponse.error.message);
      return;
    }

    const data = upsertResponse.data!!;
    const newDaysOffPeriodData: DaysOffPeriodData = {
      id: data.daysOffPeriodId,
      startDate: toNormalizedIsoDate(data.startDate),
      endDate: toNormalizedIsoDate(data.endDate),
    };
    setDispatcherLoadData((prevDispatcherLoadDataList) =>
      changeDaysOffPeriodData(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        driverId,
        newDaysOffPeriodData,
      ),
    );
  };

  const postVehicleMaintenanceRecordDeleteUpdateFn = (
    driverId: string,
    vehicleMaintenanceData: VehicleMaintenanceData[],
  ) => {
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return updateVehicleMaintenanceDataAfterDeletion(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        driverId,
        vehicleMaintenanceData,
      );
    });
  };

  const postLoadDeleteUpdateFn = (
    driver: DriverData,
    loadDataList: LoadData[],
  ) => {
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return updateLoadsAfterDeletions(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        loadDataList,
        driver,
      );
    });
  };

  const postDaysOffPeriodDeleteUpdateFn = (
    driverId: string,
    daysOffPeriodData: DaysOffPeriodData[],
  ) => {
    setDispatcherLoadData((prevDispatcherLoadDataList) => {
      return updateDaysOffPeriodsAfterDeletions(
        prevDispatcherLoadDataList,
        dispatcherLoadIdentifier,
        driverId,
        daysOffPeriodData,
      );
    });
  };

  const planningContextData: PlanningContextData = {
    days: updatedDays,
    upsertLoadDataFn: upsertLoadFn,
    upsertVehicleMaintenanceRecordFn: upsertVehicleMaintenanceRecordFn,
    upsertDaysOffPeriodFn: upsertDaysOffPeriodFn,
    postLoadDeleteUpdateFn: postLoadDeleteUpdateFn,
    postVehicleMaintenanceRecordDeleteUpdateFn:
      postVehicleMaintenanceRecordDeleteUpdateFn,
    postDaysOffPeriodDeleteUpdateFn: postDaysOffPeriodDeleteUpdateFn,
  };

  return (
    <div>
      <PlannerDispatcherRow
        dispatcherLoadData={dispatcherPlanningData}
        expander={activator}
      />
      <PlanningContext value={planningContextData}>
        {activator.isActive() &&
          dispatcherPlanningData.driverPlanningData.map(
            (driverPlanningDatum) => (
              <div key={driverPlanningDatum.relationId ?? generateUuid()}>
                <PlannerDriverRow driverPlanningData={driverPlanningDatum} />
              </div>
            ),
          )}
      </PlanningContext>
      <ToastRenderer toast={toast} />
    </div>
  );
};
