import type {
  DriverWeeklyMileage,
  Mileage,
} from "../../types/financial/trucks-board.ts";
import { BLANK_STRING } from "../constants/global.ts";
import type { Renderable } from "../../types/api/Renderable.ts";
import { Driver } from "../../types/api/Driver.ts";
import * as React from "react";
import type { User } from "../../types/api/User.ts";

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
    if (mileage.revenue !== BLANK_STRING) {
      totalRevenue += parseFloat(
        mileage.revenue.substring(2).replace(/,/g, ""),
      );
    }
    if (mileage.miles !== BLANK_STRING) {
      totalMiles += parseFloat(mileage.miles.replace(/,/g, ""));
    }
  }

  return [totalRevenue, totalMiles];
};

export const setDispatcher = (
  setDriversWeeklyMileages: React.Dispatch<
    React.SetStateAction<DriverWeeklyMileage[]>
  >,
  dispatcher: Renderable,
  index: number,
) => {
  console.log(dispatcher);
  console.log(index);
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage, i) => {
      if (i === index) {
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
  index: number,
) => {
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage, i) => {
      if (i === index) {
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
  driverWeeklyMileageIndex: number,
  mileageIndex: number,
  field: keyof Mileage,
  value: string,
) => {
  setDriversWeeklyMileages((driversWeeklyMileages) =>
    driversWeeklyMileages.map((driverWeeklyMileage, i) => {
      if (i === driverWeeklyMileageIndex) {
        return {
          ...driverWeeklyMileage,
          mileages: mileagesMapperFunction(
            driverWeeklyMileage.mileages,
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
    driver: null,
    dispatcher: null,
    mileages: getWeekMileages(weekDays),
  };
};

const getWeekMileages = (weekDays: string[]): Mileage[] => {
  return weekDays.map((value, _) => ({
    day: value,
    revenue: BLANK_STRING,
    miles: BLANK_STRING,
    destinationNote: BLANK_STRING,
  }));
};
