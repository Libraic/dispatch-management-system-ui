import type {
  DispatcherMileageData,
  DriverMileageData,
  MileageData,
} from "../../types/internal/trucks-board/trucks-board-types.ts";

import type { Driver } from "../../types/internal/classes/Driver.ts";
import {
  BLANK_STRING,
  NEW_LINE,
  ZERO,
} from "../../constants/common/global-constants.ts";
import { removeTrailingDotIfNecessary } from "../global/number-utils.ts";

export const upsertDriverMileageCallbackFunction = (
  prevDispatcherMileageDataList: DispatcherMileageData[],
  dispatcherMileageDataIdentifier: string,
  mileageDataList: MileageData[],
  driver: Driver,
  driverMileageUuid: string,
  currentWeek: string[],
) => {
  const newDispatcherMileageDataList: DispatcherMileageData[] = [];
  for (const prevDispatcherMileageData of prevDispatcherMileageDataList) {
    if (
      prevDispatcherMileageData.identifier !== dispatcherMileageDataIdentifier
    ) {
      newDispatcherMileageDataList.push(prevDispatcherMileageData);
    } else {
      const newDriverMileageDataList: DriverMileageData[] = [];
      for (const currentDriverMileageData of prevDispatcherMileageData.driverMileageDataList) {
        if (currentDriverMileageData.driver!!.getUuid() !== driver.getUuid()) {
          newDriverMileageDataList.push(currentDriverMileageData);
        } else {
          const newMileageData = new Map<string, MileageData>(
            mileageDataList.map((mileageData) => [
              mileageData.date,
              mileageData,
            ]),
          );

          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          for (const mileageDatum of newMileageData.values()) {
            if (currentWeek.includes(mileageDatum.date)) {
              driverTotalMiles += mileageDatum.miles
                ? parseFloat(mileageDatum.miles)
                : ZERO;
              driverTotalRevenue += mileageDatum.revenue
                ? parseFloat(mileageDatum.revenue)
                : ZERO;
            }
          }

          newDriverMileageDataList.push({
            ...currentDriverMileageData,
            identifier: driverMileageUuid,
            totalRevenue: driverTotalRevenue,
            totalMiles: driverTotalMiles,
            driver: driver,
            mileage: newMileageData,
          });
        }
      }

      let dispatcherTotalMiles = 0;
      let dispatcherTotalRevenue = 0;
      for (const driverMileageDatum of newDriverMileageDataList) {
        dispatcherTotalMiles += driverMileageDatum.totalMiles;
        dispatcherTotalRevenue += driverMileageDatum.totalRevenue;
      }
      newDispatcherMileageDataList.push({
        ...prevDispatcherMileageData,
        totalMiles: dispatcherTotalMiles,
        totalRevenue: dispatcherTotalRevenue,
        driverMileageDataList: newDriverMileageDataList,
      });
    }
  }

  return newDispatcherMileageDataList;
};

export const extractUnfocusedCellInformation = (
  day: string,
  driverMileageData?: DriverMileageData,
): string => {
  if (!driverMileageData) {
    return BLANK_STRING;
  }
  const mileageData = driverMileageData.mileage.get(day);
  if (!mileageData) {
    return BLANK_STRING;
  }

  return mileageData.pickUpLocation
    ? `${mileageData.pickUpLocation} \n ${mileageData.loadStatus}`
    : `${mileageData.loadStatus}`;
};

export const extractMileageDataFromDriverMileageDataByDay = (
  day: string,
  driverMileageData?: DriverMileageData,
): string => {
  if (!driverMileageData) {
    return BLANK_STRING;
  }
  const mileageData = driverMileageData.mileage.get(day);
  if (!mileageData) {
    return BLANK_STRING;
  }

  const miles = removeTrailingDotIfNecessary(mileageData.miles ?? BLANK_STRING);
  const revenue = removeTrailingDotIfNecessary(
    mileageData.revenue ?? BLANK_STRING,
  );
  return `${!mileageData.broker || mileageData.broker === BLANK_STRING ? BLANK_STRING : mileageData.broker + NEW_LINE} ${revenue} | ${miles}`;
};

export const getBlankMileageData = (day: string): MileageData => {
  const pickUpDate = new Date(day);
  return {
    broker: BLANK_STRING,
    date: day,
    revenue: BLANK_STRING,
    miles: BLANK_STRING,
    pickUpLocation: BLANK_STRING,
    pickUpDate: pickUpDate,
    deliveryLocation: BLANK_STRING,
    loadStatus: "Covered",
    deliveryDate: new Date(pickUpDate.getTime() + 24 * 60 * 60 * 1000),
  };
};
