import type { DriverWeeklyMileage } from "../../types/financial/trucks-board.ts";

export const getBlankDriverWeeklyMileage = (): DriverWeeklyMileage => {
  return {
    driver: null,
    dispatcher: null,
  };
};
