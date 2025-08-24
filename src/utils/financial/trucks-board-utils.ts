import type {
  DriverWeeklyMileage,
  Mileage,
} from "../../types/financial/trucks-board.ts";
import { BLANK_STRING } from "../constants/global.ts";
import type { Dispatch, SetStateAction } from "react";
import type { Renderable } from "../../types/api/Renderable.ts";
import { Driver } from "../../types/api/Driver.ts";

export const getBlankDriverWeeklyMileage = (
  weekDays: string[],
): DriverWeeklyMileage => {
  return {
    driver: null,
    dispatcher: null,
    mileages: getWeekMileages(weekDays),
  };
};

export const alterDriverWeeklyMileageMileages = (
  setDriverWeeklyMileage: Dispatch<SetStateAction<DriverWeeklyMileage>>,
  field: keyof Mileage,
  content: string,
  index: number,
) => {
  setDriverWeeklyMileage((driverWeeklyMileage) =>
    getDriverWeeklyMileageWithAlteredMileageFieldByIndex(
      driverWeeklyMileage,
      field,
      content,
      index,
    ),
  );
};

export const alterDriverWeeklyMileageDriver = (
  driver: Renderable,
  setDriverWeeklyMileage: Dispatch<SetStateAction<DriverWeeklyMileage>>,
) => {
  setDriverWeeklyMileage((prev) => ({
    ...prev,
    driver: driver instanceof Driver ? driver : null,
  }));
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

const getDriverWeeklyMileageWithAlteredMileageFieldByIndex = (
  driverWeeklyMileage: DriverWeeklyMileage,
  field: keyof Mileage,
  content: string,
  index: number,
) => {
  return {
    ...driverWeeklyMileage,
    mileages: driverWeeklyMileage.mileages.map((mileage, i) =>
      i !== index
        ? mileage
        : {
            ...mileage,
            [field]: content,
          },
    ),
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
