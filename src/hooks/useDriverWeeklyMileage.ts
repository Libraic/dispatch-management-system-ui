import { type Dispatch, type SetStateAction, useState } from "react";
import type {
  DriversMileageGroupsErrors,
  DriverWeeklyMileage,
} from "../types/financial/trucks-board.ts";
import type { DriversMileageGroup } from "../company/dashboard/trucks-board/TrucksBoard.tsx";

export type DriverWeeklyMileageData = {
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>;
  getDriversMileageGroups: () => DriversMileageGroup[];
  currentDriversWeeklyMileage: DriverWeeklyMileage[];
  setCurrentDriversWeeklyMileage: Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >;

  errors: DriversMileageGroupsErrors;
  setErrors: Dispatch<SetStateAction<DriversMileageGroupsErrors>>;
  getCompanyUuid: () => string;
  getWeekDays: () => string[];
};

export const useDriverWeeklyMileage = (
  companyUuid: string,
  weekDays: string[],
) => {
  const [currentDriversWeeklyMileage, setCurrentDriversWeeklyMileage] =
    useState<DriverWeeklyMileage[]>([]);
  const [errors, setErrors] = useState<DriversMileageGroupsErrors>({});
  const [groups, setGroups] = useState<DriversMileageGroup[]>([]);

  return {
    setDriversMileageGroups: setGroups,
    getDriversMileageGroups: () => groups,
    currentDriversWeeklyMileage: currentDriversWeeklyMileage,
    setCurrentDriversWeeklyMileage: setCurrentDriversWeeklyMileage,
    errors: errors,
    setErrors: setErrors,
    getCompanyUuid: () => companyUuid,
    getWeekDays: () => weekDays,
  };
};
