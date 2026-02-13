import {
  DISPATCHER_KEY,
  DRIVER_KEY,
  type DriversMileageGroup,
  type DriversMileageGroupErrors,
  type DriversMileageGroupsErrors,
  type DriverWeeklyMileage,
  type DriverWeeklyMileageResponse,
  type Mileage,
} from "../../../types/internal/trucks-board/trucks-board-old-types.ts";
import { Driver } from "../../../types/internal/classes/Driver.ts";
import { User } from "../../../types/internal/classes/User.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../../../constants/common/global-constants.ts";
import type { DriverWeeklyMileageData } from "../../../hooks/useDriverWeeklyMileage.ts";
import { saveDriversMileageOld } from "../../../service/driverMileageService.ts";
import {
  MISSING_DISPATCHER,
  MISSING_DRIVER,
} from "../../../constants/error/error-message-constants.ts";
import type {
  DriverMileage,
  UpsertDriversMileageRequestOld,
} from "../../../types/api/driver-mileage/driver-mileage-api-request-old-types.ts";
import { v4 as uuidv4 } from "uuid";
import type {
  DispatcherMileageData,
  DriverMileageData,
  MileageData,
} from "../../../types/internal/trucks-board/trucks-board-types.ts";
import type { GetDriverMileageResponse } from "../../../types/api/driver-mileage/driver-mileage-api-types.ts";
import { Dispatcher } from "../../../types/internal/classes/Dispatcher.ts";

export const convertGetDriverMileageResponseListToDispatcherMileageDataList = (
  getDriverMileageResponseList: GetDriverMileageResponse[],
  startDate: string,
  endDate: string,
) => {
  const dispatcherMileageDataList: DispatcherMileageData[] = [];
  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);
  for (const getDriverMileageResponse of getDriverMileageResponseList) {
    const driverMileageDataList: DriverMileageData[] = [];
    let totalRevenue = 0.0;
    let totalMiles = 0.0;
    for (const driverMileageData of getDriverMileageResponse.driverMileageDataList) {
      const mileageData = new Map<string, MileageData>();
      let driverTotalRevenue = 0.0;
      let driverTotalMiles = 0.0;
      for (const mileageDatum of driverMileageData.mileage) {
        mileageData.set(mileageDatum.date, {
          date: mileageDatum.date,
          miles: mileageDatum.miles.toString(),
          revenue: mileageDatum.revenue.toString(),
          broker: mileageDatum.broker ?? undefined,
        });
        const dateObject = new Date(mileageDatum.date);
        if (dateObject >= startDateObject && dateObject <= endDateObject) {
          driverTotalRevenue += mileageDatum.revenue;
          driverTotalMiles += mileageDatum.miles;
        }
      }
      totalRevenue += driverTotalRevenue;
      totalMiles += driverTotalMiles;
      driverMileageDataList.push({
        identifier: driverMileageData.driverMileageUuid,
        driver: new Driver(driverMileageData.driver),
        totalRevenue: driverTotalRevenue,
        totalMiles: driverTotalMiles,
        mileage: mileageData,
      });
    }

    dispatcherMileageDataList.push({
      identifier: uuidv4(),
      dispatcher:
        getDriverMileageResponse.dispatcher === null
          ? null
          : new Dispatcher(getDriverMileageResponse.dispatcher),
      totalMiles: totalMiles,
      totalRevenue: totalRevenue,
      startDate: startDate,
      endDate: endDate,
      driverMileageDataList: driverMileageDataList,
    });
  }

  return dispatcherMileageDataList;
};

export const mapDriverWeeklyMileageResponseToDriverWeeklyMileage = (
  item: DriverWeeklyMileageResponse,
) => {
  return {
    itemIdentifier: uuidv4(),
    driver: new Driver(item.driver),
    uuid: item.uuid,
    mileageData: item.mileageData.map((mileage) => {
      return {
        miles: mileage.miles !== null ? mileage.miles.toString() : BLANK_STRING,
        revenue:
          mileage.revenue !== null
            ? DOLLAR_SIGN + BLANK_SPACE + mileage.revenue.toString()
            : BLANK_STRING,
        note: mileage.note,
        destinationNote: mileage.destinationNote,
        date: mileage.date,
        broker: mileage.broker,
      } as Mileage;
    }),
  } as DriverWeeklyMileage;
};

// TODO: Consider optimizing this whole logic in the future
export const saveDriversWeeklyMileage = async (
  driverWeeklyMileageData: DriverWeeklyMileageData,
): Promise<DriversMileageGroupsErrors> => {
  const driversMileageGroups =
    driverWeeklyMileageData.getDriversMileageGroups();

  // Check if there are any errors before sending the data to BE.
  const errors = getErrorsPriorUpsertion(driversMileageGroups);
  if (Object.keys(errors).length !== 0) {
    return errors;
  }

  // Prepare the request.
  const upsertDriversMileageRequest =
    getUpsertDriversMileageRequestFromDriversMileageGroups(
      driversMileageGroups,
      driverWeeklyMileageData.getCompanyUuid(),
    );

  // Make the API call to the Upsert endpoint.
  const response = await saveDriversMileageOld(upsertDriversMileageRequest);

  // TODO: Take start and end date as parameters, since they are the same for each group
  if (response.data) {
    const groups = groupDriverWeeklyMileageByDispatcher(response.data);
    driverWeeklyMileageData.setDriversMileageGroups(Object.values(groups));
  }

  return {} as DriversMileageGroupsErrors;
};

export const groupDriverWeeklyMileageByDispatcher = (
  data: DriverWeeklyMileageResponse[],
) => {
  if (data.length === 0) {
    return {};
  }

  const startDate = data[0].startDate;
  const endDate = data[0].endDate;
  return data.reduce<Record<string, DriversMileageGroup>>((acc, curr) => {
    const dispatcherId = curr.dispatcher.uuid;

    if (!acc[dispatcherId]) {
      acc[dispatcherId] = {
        dispatcher: new User(curr.dispatcher),
        groupIdentifier: uuidv4(),
        startDate: startDate,
        endDate: endDate,
        items: [],
      };
    }

    acc[dispatcherId].items.push(
      mapDriverWeeklyMileageResponseToDriverWeeklyMileage(curr),
    );

    return acc;
  }, {});
};

const getErrorsPriorUpsertion = (
  driversMileageGroups: DriversMileageGroup[],
): DriversMileageGroupsErrors => {
  const errors = {} as DriversMileageGroupsErrors;
  for (const driversMileageGroup of driversMileageGroups) {
    const driversMileageErrors = {} as DriversMileageGroupErrors;
    for (const item of driversMileageGroup.items) {
      if (item.driver === null) {
        driversMileageErrors[DRIVER_KEY] = MISSING_DRIVER;
      }
    }

    if (driversMileageGroup.dispatcher === null) {
      driversMileageErrors[DISPATCHER_KEY] = MISSING_DISPATCHER;
    }

    if (Object.keys(driversMileageErrors).length !== 0) {
      errors[driversMileageGroup.groupIdentifier] = driversMileageErrors;
    }
  }

  return errors;
};

const getUpsertDriversMileageRequestFromDriversMileageGroups = (
  driversMileageGroups: DriversMileageGroup[],
  companyUuid: string,
): UpsertDriversMileageRequestOld => {
  const currentDriverWeeklyMileage: DriverMileage[] = [];
  for (const group of driversMileageGroups) {
    const dispatcherUuid = group.dispatcher!!.uuid;
    const startDate = group.startDate;
    const endDate = group.endDate;
    for (const item of group.items)
      currentDriverWeeklyMileage.push({
        mileageUuid: item.uuid,
        driverUuid: item.driver!!.getUuid(),
        dispatcherUuid: dispatcherUuid,
        itemIdentifier: item.itemIdentifier,
        startDate: startDate,
        endDate: endDate,
        mileage: mapMileageDataToMileageRequest(item.mileageData),
      });
  }
  return {
    companyUuid: companyUuid,
    driverMileageData: currentDriverWeeklyMileage,
  };
};

const mapMileageDataToMileageRequest = (mileageData: Mileage[]) => {
  return mileageData.map((mileage) => ({
    date: mileage.date,
    destinationNote: mileage.destinationNote,
    revenue: mileage.revenue
      ? parseFloat(
          mileage.revenue.split(BLANK_SPACE)[1].replace(/,/g, BLANK_STRING),
        )
      : null,
    miles: mileage.miles
      ? parseFloat(mileage.miles.replace(/,/g, BLANK_STRING))
      : null,
    note: mileage.note,
    broker: mileage.broker,
  }));
};
