import {
  DISPATCHER_KEY,
  DRIVER_KEY,
  type DriverMileageError,
  type DriversMileageErrors,
  type DriverWeeklyMileage,
  type Mileage,
  type MileageError,
} from "../../types/financial/trucks-board.ts";
import { BLANK_STRING } from "../constants/global-constants.ts";
import type { Renderable } from "../../types/api/Renderable.ts";
import { Driver } from "../../types/api/Driver.ts";
import type { SetStateAction } from "react";
import * as React from "react";
import type { User } from "../../types/api/User.ts";
import { convertMileageDayToLittleEndianDate } from "../global/date.ts";
import type { UpsertDriversMileageRequest } from "../../types/api/driver-mileage-api.ts";
import { saveDriversMileage } from "../../service/driver-mileage-service.ts";
import {
  MISSING_DISPATCHER,
  MISSING_DRIVER,
} from "../global/error-messages.ts";
import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../../types/api/common.ts";

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
  index: number,
) => {
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

export const saveDriversWeeklyMileage = async (
  previousDriversWeeklyMileage: DriverWeeklyMileage[],
  setPreviousDriversWeeklyMileage: React.Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >,
  currentDriversWeeklyMileage: DriverWeeklyMileage[],
  setCurrentDriversWeeklyMileage: React.Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >,
  companyUuid: string | null,
): Promise<DriversMileageErrors> => {
  // Compare the current data from the table with the previous data (before starting
  // to modify the existent data after the previous update / insert operation)
  // and get only the data that was modified.
  const driversWeeklyMileageToUpsert = getDriversWeeklyMileageToUpsert(
    previousDriversWeeklyMileage,
    currentDriversWeeklyMileage,
  );

  // Check if there are any errors before sending the data to BE.
  const errors = getErrorsPriorUpsertion(driversWeeklyMileageToUpsert);
  if (Object.keys(errors).length !== 0) {
    return errors;
  }

  // Prepare the request.
  const upsertDriversMileageRequest =
    getUpsertDriversMileageRequestFromDriversWeeklyMileage(
      driversWeeklyMileageToUpsert,
      companyUuid!!,
    );

  // Make the API call to the Upsert endpoint.
  const response = await saveDriversMileage(upsertDriversMileageRequest);
  const apiErrors = handleApiErrors(response);
  if (Object.keys(apiErrors).length !== 0) {
    return apiErrors;
  }

  // Set data in both current and previous data variables.
  setCurrentDriversWeeklyMileage((prev) => {
    if (!response.data) {
      return prev;
    }

    const responseDriversWeeklyMileageMap = new Map<
      string,
      DriverWeeklyMileage
    >();
    for (const driverWeeklyMileage of response.data) {
      responseDriversWeeklyMileageMap.set(
        driverWeeklyMileage.itemIdentifier,
        driverWeeklyMileage,
      );
    }

    // Make a new Driver Weekly Mileage array containing all the records updated
    // (if they were indeed updated) or take the previous ones as they were.
    const updated: DriverWeeklyMileage[] = [];
    for (const driverWeeklyMileage of prev) {
      const existing = responseDriversWeeklyMileageMap.get(
        driverWeeklyMileage.itemIdentifier,
      );
      const newDriverWeeklyMileage = existing
        ? {
            ...driverWeeklyMileage,
            uuid: existing.uuid,
          }
        : driverWeeklyMileage;
      updated.push(newDriverWeeklyMileage);
    }

    // Store the data in an additional variable to be able to extract only
    // the data that was effectively modified. This will help to avoid sending
    // a huge payload over the network and maintains unnecessary transactions
    // in the database. In-memory management is faster.
    setPreviousDriversWeeklyMileage(updated);
    return updated;
  });

  return {} as DriversMileageErrors;
};

const getDriversWeeklyMileageToUpsert = (
  previousDriversWeeklyMileage: DriverWeeklyMileage[],
  currentDriversWeeklyMileage: DriverWeeklyMileage[],
) => {
  const previousDriversWeeklyMileageMap = new Map<
    string,
    DriverWeeklyMileage
  >();
  for (const driverWeeklyMileage of previousDriversWeeklyMileage) {
    previousDriversWeeklyMileageMap.set(
      driverWeeklyMileage.itemIdentifier,
      driverWeeklyMileage,
    );
  }

  const driversWeeklyMileageToUpsert: DriverWeeklyMileage[] = [];
  for (const driverWeeklyMileage of currentDriversWeeklyMileage) {
    const existing = previousDriversWeeklyMileageMap.get(
      driverWeeklyMileage.itemIdentifier,
    );
    if (
      !existing ||
      hasAnyDriverWeeklyMileageFieldChanged(existing, driverWeeklyMileage)
    ) {
      driversWeeklyMileageToUpsert.push(driverWeeklyMileage);
    }
  }

  return driversWeeklyMileageToUpsert;
};

const hasAnyDriverWeeklyMileageFieldChanged = (
  prev: DriverWeeklyMileage,
  curr: DriverWeeklyMileage,
): boolean => {
  if (
    curr.driver === null ||
    curr.driver.getUuid() !== prev.driver!!.getUuid()
  ) {
    return true;
  }

  if (
    curr.dispatcher === null ||
    curr.dispatcher.getUuid() !== prev.dispatcher!!.getUuid()
  ) {
    return true;
  }

  const map = new Map<string, Mileage>();
  for (const mileage of prev.mileageData) {
    map.set(mileage.date, mileage);
  }

  for (const mileage of curr.mileageData) {
    const prevMileage = map.get(mileage.date) ?? {
      date: mileage.date,
      revenue: null,
      miles: null,
      destinationNote: null,
      note: null,
    };

    if (
      mileage.note !== prevMileage.note ||
      mileage.destinationNote !== prevMileage.destinationNote ||
      mileage.miles !== prevMileage.miles ||
      mileage.revenue !== prevMileage.revenue
    ) {
      return true;
    }
  }

  return false;
};

const getUpsertDriversMileageRequestFromDriversWeeklyMileage = (
  driversWeeklyMileage: DriverWeeklyMileage[],
  companyUuid: string,
): UpsertDriversMileageRequest => {
  return {
    companyUuid: companyUuid,
    driverMileageData: driversWeeklyMileage.map((value) => ({
      mileageUuid: value.uuid!!,
      dispatcherUuid: value.dispatcher?.uuid!!,
      driverUuid: value.driver?.driverData.uuid!!,
      itemIdentifier: value.itemIdentifier,
      mileage: value.mileageData.map((mileage) => ({
        date: mileage.date,
        destinationNote: mileage.destinationNote,
        revenue: mileage.revenue
          ? // ? parseFloat(
            //     mileage.revenue.split(BLANK_SPACE)[1].replace(/,/g, BLANK_STRING),
            //   )
            -3
          : null,
        miles: mileage.miles
          ? // ? parseFloat(mileage.miles.replace(/,/g, BLANK_STRING))
            -3
          : null,
        note: mileage.note,
      })),
    })),
  };
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
    itemIdentifier: new Date().toISOString(),
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

const getErrorsPriorUpsertion = (
  driversWeeklyMileage: DriverWeeklyMileage[],
): DriversMileageErrors => {
  const errors = {} as DriversMileageErrors;
  for (const driverWeeklyMileage of driversWeeklyMileage) {
    const driverMileageError = {} as DriverMileageError;
    if (
      driverWeeklyMileage.driver === null ||
      driverWeeklyMileage.driver.getUuid() === null
    ) {
      driverMileageError[DRIVER_KEY] = MISSING_DRIVER;
    }

    if (
      driverWeeklyMileage.dispatcher === null ||
      driverWeeklyMileage.dispatcher.getUuid() === null
    ) {
      driverMileageError[DISPATCHER_KEY] = MISSING_DISPATCHER;
    }

    if (Object.keys(driverMileageError).length !== 0) {
      errors[driverWeeklyMileage.itemIdentifier] = driverMileageError;
    }
  }

  return errors;
};

const handleApiErrors = (
  response: ApiResponse<DriverWeeklyMileage[], Error | GroupsErrorResponse>,
): DriversMileageErrors => {
  const errors = {} as DriversMileageErrors;
  if (response.error) {
    if ("errors" in response.error) {
      Object.entries(response.error.errors).forEach(([key, value]) => {
        const driverMileageError = {} as DriverMileageError;
        for (const err of value as Error[]) {
          if (err.identifier) {
            if (!driverMileageError[err.identifier]) {
              driverMileageError[err.identifier] = {} as MileageError;
            }
            (driverMileageError[err.identifier] as MileageError)[err.field!!] =
              err.message;
          } else {
            driverMileageError[err.field!!] = err.message;
          }
        }
        errors[key] = driverMileageError;
      });
    }
  }

  return errors;
};
