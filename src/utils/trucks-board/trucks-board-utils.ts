import type {
  DispatcherMileageData,
  DriverMileageData,
  MileageData,
} from "../../types/internal/trucks-board/trucks-board-types.ts";

import type { Driver } from "../../types/internal/classes/Driver.ts";
import {
  BLANK_STRING,
  NEW_LINE,
} from "../../constants/common/global-constants.ts";

export const upsertDriverMileageCallbackFunction = (
  prevDispatcherMileageDataList: DispatcherMileageData[],
  dispatcherMileageDataIdentifier: string,
  mileageData: MileageData,
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
          const newMileageData = new Map<string, MileageData>();
          for (const mileageDate of currentDriverMileageData.mileage.keys()) {
            if (mileageDate !== mileageData.date) {
              newMileageData.set(
                mileageDate,
                currentDriverMileageData.mileage.get(mileageDate)!,
              );
            }
          }
          newMileageData.set(mileageData.date, mileageData);

          let driverTotalMiles = 0;
          let driverTotalRevenue = 0;
          for (const mileageDatum of newMileageData.values()) {
            if (currentWeek.includes(mileageDatum.date)) {
              driverTotalMiles += mileageDatum.miles;
              driverTotalRevenue += mileageDatum.revenue;
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

  return `${!mileageData.broker || mileageData.broker === BLANK_STRING ? BLANK_STRING : mileageData.broker + NEW_LINE} ${mileageData.revenue} | ${mileageData.miles}`;
};
