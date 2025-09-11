import {
  type DriverWeeklyMileage,
  type Mileage,
} from "../../types/financial/trucks-board.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOT,
  HYPHEN,
} from "../constants/global-constants.ts";
import type { Renderable } from "../../types/api/Renderable.ts";
import { Driver } from "../../types/api/Driver.ts";
import * as React from "react";
import type { User } from "../../types/api/User.ts";
import {
  convertMileageDayToLittleEndianDate,
  CURRENT_YEAR,
} from "../global/date.ts";
import { v4 as uuidv4 } from "uuid";

export const addDriverWeeklyMileage = (
  setDriversWeeklyMileages: React.Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >,
  weekDays: string[],
) => {
  setDriversWeeklyMileages((prev) => [
    ...prev,
    getBlankDriverWeeklyMileage(weekDays),
  ]);
};

export const getTotalRevenueAndMiles = (mileages: Mileage[]): number[] => {
  let totalRevenue = 0.0;
  let totalMiles = 0.0;
  for (const mileage of mileages) {
    if (mileage.revenue) {
      totalRevenue += parseFloat(
        mileage.revenue.substring(2).replace(/,/g, BLANK_STRING),
      );
    }
    if (mileage.miles) {
      totalMiles += parseFloat(mileage.miles.replace(/,/g, BLANK_STRING));
    }
  }

  return [totalRevenue, totalMiles];
};

export const setDispatcher = (
  setDriversWeeklyMileages: React.Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >,
  dispatcher: Renderable,
  itemIdentifier: string,
) => {
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage) => {
      if (driverWeeklyMileage.itemIdentifier === itemIdentifier) {
        return {
          ...driverWeeklyMileage,
          dispatcher: dispatcher as User,
        };
      }
      return driverWeeklyMileage;
    }),
  );
};

export const setDriver = (
  setDriversWeeklyMileages: React.Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >,
  driver: Renderable,
  itemIdentifier: string,
) => {
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage) => {
      if (driverWeeklyMileage.itemIdentifier === itemIdentifier) {
        return {
          ...driverWeeklyMileage,
          driver: driver as Driver,
        };
      }
      return driverWeeklyMileage;
    }),
  );
};

export const setDriverWeeklyMileage = (
  setDriversWeeklyMileages: React.Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >,
  driversMileageIdentifier: string,
  mileageIndex: number,
  field: keyof Mileage,
  value: string,
) => {
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage) => {
      if (driverWeeklyMileage.itemIdentifier === driversMileageIdentifier) {
        return {
          ...driverWeeklyMileage,
          mileageData: mileagesMapperFunction(
            driverWeeklyMileage.mileageData,
            mileageIndex,
            field,
            value,
          ),
        };
      }
      return driverWeeklyMileage;
    }),
  );
};

export const getLittleEndianDateFromDriversMileageDate = (
  apiStartDate: string,
): string => {
  const startDateParts = apiStartDate.split(BLANK_SPACE)[1].split(DOT);
  return startDateParts[1] + HYPHEN + startDateParts[0] + HYPHEN + CURRENT_YEAR;
};

const mileagesMapperFunction = (
  mileages: Mileage[],
  index: number,
  field: keyof Mileage,
  value: string,
) => {
  return mileages.map((mileage, j) => {
    if (j === index) {
      return {
        ...mileage,
        [field]: value,
      };
    }
    return mileage;
  });
};

const getBlankDriverWeeklyMileage = (
  weekDays: string[],
): DriverWeeklyMileage => {
  return {
    uuid: null,
    driver: null,
    dispatcher: null,
    itemIdentifier: uuidv4(),
    startDate: getDate(weekDays[0]),
    endDate: getDate(weekDays[weekDays.length - 1]),
    mileageData: getWeekMileages(weekDays),
  };
};

const getWeekMileages = (weekDays: string[]): Mileage[] => {
  return weekDays.map((value, _) => ({
    date: convertMileageDayToLittleEndianDate(value),
    revenue: null,
    miles: null,
    note: null,
    destinationNote: null,
  }));
};

const getDate = (day: string): string => {
  const firstDay = day.split(BLANK_SPACE)[1];
  const firstDayParts = firstDay.split(DOT);
  return (
    firstDayParts[2] + HYPHEN + firstDayParts[0] + HYPHEN + firstDayParts[1]
  );
};
