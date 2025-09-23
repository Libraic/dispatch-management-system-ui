import { type Dispatch, type SetStateAction, useState } from "react";
import type {
  DriversMileageGroup,
  DriversMileageGroupsErrors,
} from "../types/financial/trucks-board.ts";

export type DriverWeeklyMileageData = {
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>;
  getDriversMileageGroups: () => DriversMileageGroup[];
  errors: DriversMileageGroupsErrors;
  setErrors: Dispatch<SetStateAction<DriversMileageGroupsErrors>>;
  getCompanyUuid: () => string;
  getWeekDays: () => string[];
};

export const useDriverWeeklyMileage = (
  companyUuid: string,
  weekDays: string[],
) => {
  const [errors, setErrors] = useState<DriversMileageGroupsErrors>({});
  const [groups, setGroups] = useState<DriversMileageGroup[]>([]);

  return {
    setDriversMileageGroups: setGroups,
    getDriversMileageGroups: () => groups,
    errors: errors,
    setErrors: setErrors,
    getCompanyUuid: () => companyUuid,
    getWeekDays: () => weekDays,
  };
};
