import {
  type DriversMileageGroup,
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
  ZERO,
} from "../../../constants/common/global-constants.ts";
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
          miles: mileageDatum.miles
            ? mileageDatum.miles.toString()
            : BLANK_STRING,
          revenue: mileageDatum.revenue
            ? mileageDatum.revenue.toString()
            : BLANK_STRING,
          broker: mileageDatum.broker,
          representative: mileageDatum.representative ?? undefined,
          pickUpDate: new Date(mileageDatum.pickUpDate),
          deliveryDate: new Date(mileageDatum.deliveryDate),
          pickUpLocation: mileageDatum.pickUpLocation,
          deliveryLocation: mileageDatum.deliveryLocation,
          loadStatus: mileageDatum.loadStatus,
          representativeContactNumber: mileageDatum.representativeContactNumber,
        });
        const dateObject = new Date(mileageDatum.date);
        if (dateObject >= startDateObject && dateObject <= endDateObject) {
          driverTotalRevenue += mileageDatum.revenue ?? ZERO;
          driverTotalMiles += mileageDatum.miles ?? ZERO;
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
