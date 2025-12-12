import {
  type DriversMileageGroup,
  type DriverWeeklyMileage,
  type Mileage,
} from "../../types/internal/trucks-board/trucks-board-types.ts";
import {
  BLANK_STRING,
  HYPHEN,
} from "../../constants/common/global-constants.ts";
import { type Dispatch, type SetStateAction } from "react";
import type { User } from "../../types/internal/classes/User.ts";
import { v4 as uuidv4 } from "uuid";
import type { Driver } from "../../types/internal/classes/Driver.ts";
import type { Renderable } from "../../types/internal/classes/Renderable.ts";
import {
  DEFAULT_DATE_LOCALE,
  WEEKDAYS,
} from "../../constants/date/date-constants.ts";

export const addNewDriversMileageGroup = (
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>,
  weekDays: string[],
) => {
  setDriversMileageGroups((prev) => [
    ...prev,
    getBlankDriversMileageGroup(weekDays),
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
  dispatcher: Renderable,
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>,
  groupIdentifier: string,
  weekDays: string[],
) => {
  setDriversMileageGroups((groups) => {
    let found = false;
    const updatedGroups = groups.map((group) => {
      if (group.dispatcher?.getUuid() === dispatcher.getUuid()) {
        found = true;
        return {
          ...group,
          items: [...group.items, getBlankDriverWeeklyMileage(weekDays)],
        };
      }

      if (group.groupIdentifier === groupIdentifier && !found) {
        return { ...group, dispatcher: dispatcher as User };
      }

      return group;
    });
    return updatedGroups.filter((group) => group.dispatcher !== null);
  });
};

export const setDriver = (
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>,
  driver: Renderable,
  groupIdentifier: string,
  itemIdentifier: string,
) => {
  setDriversMileageGroups((groups) =>
    groups.map((group) =>
      group.groupIdentifier === groupIdentifier
        ? {
            ...group,
            items: group.items.map((item) =>
              item.itemIdentifier === itemIdentifier
                ? { ...item, driver: driver as Driver }
                : item,
            ),
          }
        : group,
    ),
  );
};

export const setDriverWeeklyMileage = (
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>,
  groupIdentifier: string,
  driversMileageIdentifier: string,
  mileageIndex: number,
  field: keyof Mileage,
  value: string,
) => {
  setDriversMileageGroups((groups) =>
    groups.map((group) =>
      group.groupIdentifier === groupIdentifier
        ? {
            ...group,
            items: group.items.map((item) =>
              item.itemIdentifier === driversMileageIdentifier
                ? {
                    ...item,
                    mileageData: mileagesMapperFunction(
                      item.mileageData,
                      mileageIndex,
                      field,
                      value,
                    ),
                  }
                : item,
            ),
          }
        : group,
    ),
  );
};

export const mileagesMapperFunction = (
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

export const getWeekWithDayAndMonth = (week: string[]) => {
  const biweeklyTimeline = [...week];
  for (const weekDay of week) {
    const [y, m, d] = weekDay.split(HYPHEN).map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 7);
    biweeklyTimeline.push(date.toLocaleDateString(DEFAULT_DATE_LOCALE));
  }

  return biweeklyTimeline.map((day, index) => {
    const dateParts = day.split(HYPHEN);
    return `${WEEKDAYS[index % 7]} ${dateParts[2]}.${dateParts[1]}`;
  });
};

const getBlankDriversMileageGroup = (
  weekDays: string[],
): DriversMileageGroup => {
  return {
    dispatcher: null,
    groupIdentifier: uuidv4(),
    startDate: weekDays[0],
    endDate: weekDays[weekDays.length - 1],
    items: [
      {
        uuid: null,
        driver: null,
        itemIdentifier: uuidv4(),
        mileageData: getWeekMileages(weekDays),
      },
    ],
  };
};

const getBlankDriverWeeklyMileage = (weekDays: string[]) => {
  return {
    uuid: null,
    driver: null,
    itemIdentifier: uuidv4(),
    mileageData: getWeekMileages(weekDays),
  } as DriverWeeklyMileage;
};

const getWeekMileages = (weekDays: string[]): Mileage[] => {
  const biweeklyTimeline = [...weekDays];
  for (const weekDay of weekDays) {
    const date = new Date(weekDay);
    date.setDate(date.getDate() + 7);
    biweeklyTimeline.push(date.toISOString().split("T")[0]);
  }

  return biweeklyTimeline.map((value, _) => ({
    date: value,
    revenue: null,
    miles: null,
    note: null,
    destinationNote: null,
    broker: null,
  }));
};
