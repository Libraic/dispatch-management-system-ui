import { type Dispatch, type SetStateAction, useState } from "react";
import type {
  DriversMileageErrors,
  DriverWeeklyMileage,
} from "../types/financial/trucks-board.ts";

export type DriverWeeklyMileageData = {
  previousDriversWeeklyMileage: DriverWeeklyMileage[];
  setPreviousDriversWeeklyMileage: Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >;
  currentDriversWeeklyMileage: DriverWeeklyMileage[];
  setCurrentDriversWeeklyMileage: Dispatch<
    SetStateAction<DriverWeeklyMileage[]>
  >;
  markForDeletion: (itemIdentifier: string) => void;
  unmarkForDeletion: (itemIdentifier: string) => void;
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

  return {
    previousDriversWeeklyMileage: previousDriversWeeklyMileage,
    setPreviousDriversWeeklyMileage: setPreviousDriversWeeklyMileage,
    currentDriversWeeklyMileage: currentDriversWeeklyMileage,
    setCurrentDriversWeeklyMileage: setCurrentDriversWeeklyMileage,
    markForDeletion: (itemIdentifier: string) =>
      setIdentifiers((prevIdentifiers) => [...prevIdentifiers, itemIdentifier]),
    unmarkForDeletion: (itemIdentifier: string) =>
      setIdentifiers((prev) =>
        prev.filter((identifier) => identifier !== itemIdentifier),
      ),
    clearItemsMarkedForDeletion: () => setIdentifiers([]),
    getIdentifiersMarkedForDeletion: () => identifiers,
    errors: errors,
    setErrors: setErrors,
    getCompanyUuid: () => companyUuid,
    getWeekDays: () => weekDays,
  };
};
