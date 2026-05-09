import React from "react";
import type { Pagination } from "#/shared/hooks/usePagination";
import type { Page } from "#/shared/types/api.types";
import type { DriverData } from "#/features/drivers/api/api.types";

export interface DriversTableContextData {
  pagination: Pagination;
  drivers: Page<DriverData>;
  fetchFn: (pageNumber: number) => void;
}

export interface RegistrationContextData<T, E> {
  registrationData: T;
  setRegistrationData: React.Dispatch<React.SetStateAction<T>>;
  registrationDataError: E;
  joinableEntityId?: string;
}
