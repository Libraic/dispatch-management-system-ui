import { useActivator } from "../../../../hooks/useActivator.ts";
import React from "react";
import type {
  DaysOffPeriodData,
  DispatchingRelation,
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
import { PlannerWorkforceRow } from "../internal/PlannerWorkforceRow.tsx";
import { generateUuid } from "../../../../utils/global/general-utils.ts";
import { ToastRenderer } from "../../../Common/Toast/ToastRenderer.tsx";
import type { UpsertVehicleMaintenanceRecordRequest } from "../../../../types/api/vehicle-maintenance/vehicle-maintenance-api-request-types.ts";
import { upsertVehicleMaintenanceRecord } from "../../../../service/vehicleMaintenanceService.ts";
import { DispatchingContext } from "../../../../context/DispatchingContext.ts";
import type { UpsertDayOffPeriodRequest } from "../../../../types/api/days-off/days-off-api-request-types.ts";
import { upsertDaysOffPeriod } from "../../../../service/daysOffService.ts";
import type { DispatchingContextData } from "../../../../context/DispatchingContextData.ts";
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
  dispatchingRelation: DispatchingRelation;
  setDispatchingRelation: React.Dispatch<
    React.SetStateAction<DispatchingRelation[]>
  >;
}> = ({ companyId, days, dispatchingRelation, setDispatchingRelation }) => {
  const updatedDays = days.map((day) => day.split(BLANK_SPACE)[1]);
  const activator = useActivator(true);
  const dispatchingRelationId = dispatchingRelation.id;
  const toast = useToast();

  const upsertLoadFn = async (driver: DriverData, loadData: LoadData) => {
    const representativeContactNumber = loadData.representativeContactNumber
      ? cleanPhoneNumber(loadData.representativeContactNumber)
      : undefined;
    const upsertRequest: UpsertLoadRequest = {
      loadUuid: loadData.id,
      companyUuid: companyId,
      dispatcherUuid: dispatchingRelation.dispatcher.uuid,
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

    setDispatchingRelation((prevDispatcherLoadDataList) => {
      return upsertDriverLoadCallbackFunction(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
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
    setDispatchingRelation((prevDispatcherLoadDataList) =>
      changeWorkforceVehicleMaintenanceData(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
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
    setDispatchingRelation((prevDispatcherLoadDataList) =>
      changeDaysOffPeriodData(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
        driverId,
        newDaysOffPeriodData,
      ),
    );
  };

  const postVehicleMaintenanceRecordDeleteUpdateFn = (
    driverId: string,
    vehicleMaintenanceData: VehicleMaintenanceData[],
  ) => {
    setDispatchingRelation((prevDispatcherLoadDataList) => {
      return updateVehicleMaintenanceDataAfterDeletion(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
        driverId,
        vehicleMaintenanceData,
      );
    });
  };

  const postLoadDeleteUpdateFn = (
    driver: DriverData,
    loadDataList: LoadData[],
  ) => {
    setDispatchingRelation((prevDispatcherLoadDataList) => {
      return updateLoadsAfterDeletions(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
        loadDataList,
        driver,
      );
    });
  };

  const postDaysOffPeriodDeleteUpdateFn = (
    driverId: string,
    daysOffPeriodData: DaysOffPeriodData[],
  ) => {
    setDispatchingRelation((prevDispatcherLoadDataList) => {
      return updateDaysOffPeriodsAfterDeletions(
        prevDispatcherLoadDataList,
        dispatchingRelationId,
        driverId,
        daysOffPeriodData,
      );
    });
  };

  const dispatchingContextData: DispatchingContextData = {
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
        dispatchingRelation={dispatchingRelation}
        expander={activator}
      />
      <DispatchingContext value={dispatchingContextData}>
        {activator.isActive() &&
          dispatchingRelation.workforceUnits.map((workforce) => (
            <div key={workforce.relationId ?? generateUuid()}>
              <PlannerWorkforceRow workforce={workforce} />
            </div>
          ))}
      </DispatchingContext>
      <ToastRenderer toast={toast} />
    </div>
  );
};
