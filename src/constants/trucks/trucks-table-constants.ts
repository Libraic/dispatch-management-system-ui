import type { Column } from "#/shared/types/view.types";

export const TRUCKS_VIEW_COLUMNS: Column[] = [
  { key: "truckNumber", label: "Truck Number" },
  { key: "vinNumber", label: "VIN Number" },
  { key: "model", label: "Model" },
  { key: "truckMake", label: "Truck Make" },
  { key: "fuelType", label: "Fuel Type" },
];

export const TRUCKS_VIEW_COLUMNS_LAYOUT =
  "grid-cols-[minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(20rem,2fr)_1rem]";
