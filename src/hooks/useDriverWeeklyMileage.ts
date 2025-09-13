import { type Dispatch, type SetStateAction, useState } from "react";
import type {
  DriversMileageErrors,
  DriverWeeklyMileage,
} from "../types/financial/trucks-board.ts";
import type { DriversMileageGroup } from "../company/dashboard/trucks-board/TrucksBoard.tsx";

export type DriverWeeklyMileageData = {
  setDriversMileageGroups: Dispatch<SetStateAction<DriversMileageGroup[]>>;
  getDriversMileageGroups: () => DriversMileageGroup[];
  previousDriversWeeklyMileage: DriverWeeklyMileage[];
  setPreviousDriversWeeklyMileage: Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >;
  currentDriversWeeklyMileage: DriverWeeklyMileage[];
  setCurrentDriversWeeklyMileage: Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >;
  clearItemsMarkedForDeletion: () => void;
  getIdentifiersMarkedForDeletion: () => string[];
  errors: DriversMileageErrors;
  setErrors: Dispatch<SetStateAction<DriversMileageErrors>>;
  getCompanyUuid: () => string;
  getWeekDays: () => string[];
};

export const useDriverWeeklyMileage = (
  companyUuid: string,
  weekDays: string[],
) => {
  const [previousDriversWeeklyMileage, setPreviousDriversWeeklyMileage] =
    useState<DriverWeeklyMileage[]>([]);
  const [currentDriversWeeklyMileage, setCurrentDriversWeeklyMileage] =
    useState<DriverWeeklyMileage[]>([]);
  const [errors, setErrors] = useState<DriversMileageErrors>({});
  const [identifiers, setIdentifiers] = useState<string[]>([]);
  const [groups, setGroups] = useState<DriversMileageGroup[]>([]);

  return {
    setDriversMileageGroups: setGroups,
    getDriversMileageGroups: () => groups,
    previousDriversWeeklyMileage: previousDriversWeeklyMileage,
    setPreviousDriversWeeklyMileage: setPreviousDriversWeeklyMileage,
    currentDriversWeeklyMileage: currentDriversWeeklyMileage,
    setCurrentDriversWeeklyMileage: setCurrentDriversWeeklyMileage,
    clearItemsMarkedForDeletion: () => setIdentifiers([]),
    getIdentifiersMarkedForDeletion: () => identifiers,
    errors: errors,
    setErrors: setErrors,
    getCompanyUuid: () => companyUuid,
    getWeekDays: () => weekDays,
  };
};
