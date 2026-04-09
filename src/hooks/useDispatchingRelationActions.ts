import type {
  DaysOffPeriodData,
  DispatchingRelation,
  DriverWorkforce,
  LoadData,
  LoadStatus,
  VehicleMaintenanceData,
} from "../types/internal/planner/planner-types.ts";
import { createUpsertLoadRequest } from "../utils/api/planner/planner-api-utils.ts";
import { upsertLoad } from "../service/loadService.ts";
import { toIsoDate, toNormalizedIsoDate } from "../utils/global/date-utils.ts";
import {
  fromApiLoadLocationToLoadLocationData,
  updateLoadsAfterDeletions,
  upsertDriverLoadCallbackFunction,
} from "../utils/planner/load-utils.ts";
import type { UpsertVehicleMaintenanceRecordRequest } from "../types/api/vehicle-maintenance/vehicle-maintenance-api-request-types.ts";
import {
  changeWorkforceVehicleMaintenanceData,
  updateVehicleMaintenanceDataAfterDeletion,
} from "../utils/planner/vehicle-maintenance-utils.ts";
import { upsertVehicleMaintenanceRecord } from "../service/vehicleMaintenanceService.ts";
import type { UpsertDayOffPeriodRequest } from "../types/api/days-off/days-off-api-request-types.ts";
import { upsertDaysOffPeriod } from "../service/daysOffService.ts";
import {
  changeDaysOffPeriodData,
  updateDaysOffPeriodsAfterDeletions,
} from "../utils/planner/days-off-utils.ts";
import type { DriverData } from "../types/api/driver/driver-api-response-types.ts";
import React from "react";

export const useDispatchingRelationActions = (
  dispatchingRelationId: string,
  setDispatchingRelation: React.Dispatch<
    React.SetStateAction<DispatchingRelation[]>
  >,
) => {
  const upsertLoadFn = async (
    workforce: DriverWorkforce,
    loadData: LoadData,
    loadStatus?: LoadStatus,
  ) => {
    const upsertRequest = createUpsertLoadRequest(
      loadData,
      workforce.relationId,
    );

    if (loadStatus) {
      upsertRequest.loadStatus = loadStatus;
    }

    const upsertResponse = await upsertLoad(upsertRequest);

    if (upsertResponse.error) {
      return upsertResponse.error.message;
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
        workforce.driver,
      );
    });

    return null;
  };

  const upsertVehicleMaintenanceRecordFn = async (
    vehicleMaintenanceData: VehicleMaintenanceData,
    driverId: string,
    relationId: string,
  ) => {
    const request: UpsertVehicleMaintenanceRecordRequest = {
      vehicleMaintenanceRecordUuid: vehicleMaintenanceData.id,
      relationId: relationId,
      location: vehicleMaintenanceData.location,
      startDate: toIsoDate(vehicleMaintenanceData.startDate),
      endDate: toIsoDate(vehicleMaintenanceData.endDate),
    };

    const upsertResponse = await upsertVehicleMaintenanceRecord(request);
    if (upsertResponse.error) {
      return upsertResponse.error.message;
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

    return null;
  };

  const upsertDaysOffPeriodFn = async (
    daysOffPeriodData: DaysOffPeriodData,
    driverId: string,
    relationId: string,
  ) => {
    const request: UpsertDayOffPeriodRequest = {
      daysOffPeriodId: daysOffPeriodData.id,
      relationId: relationId,
      startDate: toIsoDate(daysOffPeriodData.startDate),
      endDate: toIsoDate(daysOffPeriodData.endDate),
    };

    const upsertResponse = await upsertDaysOffPeriod(request);
    if (upsertResponse.error) {
      return upsertResponse.error.message;
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

    return null;
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

  return {
    upsertLoadFn,
    upsertVehicleMaintenanceRecordFn,
    upsertDaysOffPeriodFn,
    postVehicleMaintenanceRecordDeleteUpdateFn,
    postLoadDeleteUpdateFn,
    postDaysOffPeriodDeleteUpdateFn,
  };
};
