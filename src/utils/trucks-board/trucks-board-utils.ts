import type { Renderable } from "../../types/internal/classes/Renderable.ts";
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

// TODO: Revise edge-cases and update the function accordingly
export const upsertDriverMileageCallbackFunction = (
  prevDispatcherMileageDataList: DispatcherMileageData[],
  dispatcherMileageDataIdentifier: string,
  mileageData: MileageData,
  driver: Driver,
  driverMileageUuid: string,
  driverMileageDataIdentifier?: string,
) => {
  const newDispatcherMileageDataList: DispatcherMileageData[] = [];
  for (const prevDispatcherMileageData of prevDispatcherMileageDataList) {
    if (
      prevDispatcherMileageData.identifier !== dispatcherMileageDataIdentifier
    ) {
      newDispatcherMileageDataList.push(prevDispatcherMileageData);
    } else {
      // We check if there is already a Driver with the same UUID in the array.
      // If there is, we will have to replace the data for that Driver later on.
      const existsDriver =
        prevDispatcherMileageData.driverMileageDataList.find(
          (driverMileageData) =>
            driverMileageData.driver!!.getUuid() === driver.getUuid(),
        ) !== undefined;
      const newDriverMileageDataList: DriverMileageData[] = [];

      // If no occurrence of the current record was found, we add it in the array.
      // Basically, if there is no record that has the same ID as the one passed
      // as argument (if passed) and no Driver was found, we conclude that the
      // Driver's data we are adding is new.
      if (!driverMileageDataIdentifier && !existsDriver) {
        newDriverMileageDataList.push(
          ...prevDispatcherMileageData.driverMileageDataList,
        );
        newDriverMileageDataList.push({
          identifier: driverMileageUuid,
          driver: driver,
          totalMiles: mileageData.miles,
          totalRevenue: mileageData.revenue,
          mileage: [mileageData],
        });
      } else {
        for (const currentDriverMileageData of prevDispatcherMileageData.driverMileageDataList) {
          if (
            currentDriverMileageData.identifier ===
              driverMileageDataIdentifier ||
            currentDriverMileageData.driver!!.getUuid() === driver.getUuid()
          ) {
            const newMileage: MileageData[] = [];
            let wasDateFound = false;

            // This is for update logic.
            // If we find something for the same date, we just consider the new Mileage Data.
            for (const currentMileageData of currentDriverMileageData.mileage) {
              let newMileageData;
              if (currentMileageData.date === mileageData.date) {
                wasDateFound = true;
                newMileageData = mileageData;
              } else {
                newMileageData = currentMileageData;
              }
              newMileage.push(newMileageData);
            }

            // This is for insert logic.
            // If the wasDateFound flag is false, it means the date of the new Mileage Data was not found in the array.
            // This means that we have a new record.
            if (!wasDateFound) {
              newMileage.push(mileageData);
            }

            const newDriver =
              driver?.getUuid() === currentDriverMileageData.driver!!.getUuid()
                ? currentDriverMileageData.driver
                : driver;
            let driverTotalMiles = 0;
            let driverTotalRevenue = 0;
            for (const mileageDatum of newMileage) {
              driverTotalMiles += mileageDatum.miles;
              driverTotalRevenue += mileageDatum.revenue;
            }
            newDriverMileageDataList.push({
              ...currentDriverMileageData,
              totalRevenue: driverTotalRevenue,
              totalMiles: driverTotalMiles,
              driver: newDriver,
              mileage: newMileage,
            });
          } else {
            newDriverMileageDataList.push(currentDriverMileageData);
          }
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

export const updateDriverCallbackFunction = (
  newDriver: Renderable,
  prev: DispatcherMileageData[],
  driverMileageDataIdentifier: string,
  dispatcherMileageDataIdentifier: string,
) => {
  const newDispatcherMileageDataList: DispatcherMileageData[] = [];
  for (const prevDispatcherMileageData of prev) {
    if (
      prevDispatcherMileageData.identifier !== dispatcherMileageDataIdentifier
    ) {
      newDispatcherMileageDataList.push(prevDispatcherMileageData);
    } else {
      const newDriverMileageDataList: DriverMileageData[] = [];
      for (const driverMileageData of prevDispatcherMileageData.driverMileageDataList) {
        const newDriverMileageData =
          driverMileageData.identifier !== driverMileageDataIdentifier
            ? driverMileageData
            : {
                ...driverMileageData,
                driver: newDriver as Driver,
              };
        newDriverMileageDataList.push(newDriverMileageData);
      }

      newDispatcherMileageDataList.push({
        ...prevDispatcherMileageData,
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
  const mileageData = driverMileageData.mileage.find((x) => x.date === day);
  if (!mileageData) {
    return BLANK_STRING;
  }

  return `${!mileageData.broker || mileageData.broker === BLANK_STRING ? BLANK_STRING : mileageData.broker + NEW_LINE} ${mileageData.revenue} | ${mileageData.miles}`;
};
