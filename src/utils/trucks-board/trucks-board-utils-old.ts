import type {
  DispatcherMileageData,
  MileageData,
} from "../../types/internal/trucks-board/trucks-board-types.ts";
import { v4 as uuidv4 } from "uuid";
import { ZERO } from "../../constants/common/global-constants.ts";

export const createEmptyDispatcherMileageData = (
  startDate: string,
  endDate: string,
): DispatcherMileageData => {
  return {
    identifier: uuidv4(),
    dispatcher: null,
    startDate: startDate,
    endDate: endDate,
    totalMiles: ZERO,
    totalRevenue: ZERO,
    driverMileageDataList: [],
  };
};

export const createMileageData = (
  day: string,
  mileageData: MileageData[],
): MileageData => {
  for (const mileage of mileageData) {
    if (mileage.date === day) {
      return { ...mileage };
    }
  }

  return {
    revenue: ZERO,
    miles: ZERO,
    date: day,
  };
};
