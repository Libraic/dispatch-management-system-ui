import {
  DISPATCHER_KEY,
  DRIVER_KEY,
  type DriverMileageError,
  type DriversMileageErrors,
  type DriverWeeklyMileage,
  type DriverWeeklyMileageResponse,
  type Mileage,
  type MileageError,
} from "../../types/financial/trucks-board.ts";
import { Driver } from "../../types/api/Driver.ts";
import { User } from "../../types/api/User.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
} from "../constants/global-constants.ts";
import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../../types/api/common.ts";
import type { DriverWeeklyMileageData } from "../../hooks/useDriverWeeklyMileage.ts";
import {
  deleteDriversMileageByUuids,
  saveDriversMileage,
} from "../../service/driver-mileage-service.ts";
import {
  MISSING_DISPATCHER,
  MISSING_DRIVER,
} from "../global/error-messages.ts";
import type { UpsertDriversMileageRequest } from "../../types/api/driver-mileage-api.ts";
import { v4 as uuidv4 } from "uuid";

export const mapDriverWeeklyMileageResponseToDriverWeeklyMileage = (
  item: DriverWeeklyMileageResponse,
) => {
  return {
    itemIdentifier: uuidv4(),
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

export const saveDriversWeeklyMileage = async (
  driverWeeklyMileageData: DriverWeeklyMileageData,
): Promise<DriversMileageErrors> => {
  // Compare the current data from the table with the previous data (before starting
  // to modify the existent data after the previous update / insert operation)
  // and get only the data that was modified.
  const driversWeeklyMileageToUpsert = getDriversWeeklyMileageToUpsert(
    driverWeeklyMileageData.previousDriversWeeklyMileage,
    driverWeeklyMileageData.currentDriversWeeklyMileage,
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
      driverWeeklyMileageData.getCompanyUuid(),
    );

  // Make the API call to the Upsert endpoint.
  const response = await saveDriversMileage(upsertDriversMileageRequest);
  const apiErrors = handleApiErrors(response);
  if (Object.keys(apiErrors).length !== 0) {
    return apiErrors;
  }

  // Set data in both current and previous data variables.
  driverWeeklyMileageData.setCurrentDriversWeeklyMileage((prev) => {
    if (!response.data) {
      return prev;
    }

    const responseDriversWeeklyMileageMap = new Map<
      string,
      DriverWeeklyMileageResponse
    >();
    for (const driverWeeklyMileageResponse of response.data) {
      responseDriversWeeklyMileageMap.set(
        driverWeeklyMileageResponse.itemIdentifier!!,
        driverWeeklyMileageResponse,
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
    driverWeeklyMileageData.setPreviousDriversWeeklyMileage(updated);
    return updated;
  });

  return {} as DriversMileageErrors;
};

export const deleteDriversMileage = async (
  driversWeeklyMileageData: DriverWeeklyMileageData,
): Promise<Error | null> => {
  const itemIdentifiers =
    driversWeeklyMileageData.getIdentifiersMarkedForDeletion();
  const ids = driversWeeklyMileageData.currentDriversWeeklyMileage
    .filter(
      (item) =>
        itemIdentifiers.includes(item.itemIdentifier) && item.uuid !== null,
    )
    .map((item) => item.uuid!!);
  const response = await deleteDriversMileageByUuids(ids);
  if (!response.error) {
    const updatedDriversWeeklyMileageMap =
      driversWeeklyMileageData.currentDriversWeeklyMileage.filter(
        (item) => !itemIdentifiers.includes(item.itemIdentifier),
      );
    driversWeeklyMileageData.setCurrentDriversWeeklyMileage(
      updatedDriversWeeklyMileageMap,
    );
    driversWeeklyMileageData.setPreviousDriversWeeklyMileage(
      updatedDriversWeeklyMileageMap,
    );
    driversWeeklyMileageData.clearItemsMarkedForDeletion();
    return null;
  }

  return response.error;
};

const handleApiErrors = (
  response: ApiResponse<
    DriverWeeklyMileageResponse[],
    Error | GroupsErrorResponse
  >,
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
          ? parseFloat(
              mileage.revenue.split(BLANK_SPACE)[1].replace(/,/g, BLANK_STRING),
            )
          : null,
        miles: mileage.miles
          ? parseFloat(mileage.miles.replace(/,/g, BLANK_STRING))
          : null,
        note: mileage.note,
      })),
    })),
  };
};
