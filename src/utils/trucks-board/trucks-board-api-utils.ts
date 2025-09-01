import type {
  DriverWeeklyMileage,
  DriverWeeklyMileageResponse,
  Mileage,
} from "../../types/financial/trucks-board.ts";
import { Driver } from "../../types/api/Driver.ts";
import { User } from "../../types/api/User.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../constants/global-constants.ts";

export const mapDriverWeeklyMileageResponseToDriverWeeklyMileage = (
  item: DriverWeeklyMileageResponse,
) => {
  return {
    itemIdentifier: new Date().toISOString(),
    driver: new Driver(item.driver),
    dispatcher: new User(item.dispatcher),
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
      } as Mileage;
    }),
  } as DriverWeeklyMileage;
};
