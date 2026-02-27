import { Driver } from "../../../types/internal/classes/Driver.ts";
import {
  BLANK_STRING,
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
        const pickUpDate = mileageDatum.pickUpDate
          ? new Date(mileageDatum.pickUpDate)
          : new Date(mileageDatum.date);
        const deliveryDate = mileageDatum.deliveryDate
          ? new Date(mileageDatum.deliveryDate)
          : new Date(pickUpDate.getTime() + 24 * 60 * 60 * 1000);
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
          pickUpDate: pickUpDate,
          deliveryDate: deliveryDate,
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
