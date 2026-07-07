import type { Column } from "#/shared/types/view.types";

export const DRIVERS_VIEW_COLUMNS: Column[] = [
  { key: "name", label: "Name" },
  { key: "truck", label: "Truck" },
  { key: "trailer", label: "Trailer" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
];

export const DRIVERS_VIEW_COLUMNS_LAYOUT =
  "grid-cols-[minmax(15rem,1fr)_minmax(15rem,1fr)_minmax(15rem,1fr)_minmax(15rem,1fr)_minmax(18rem,2fr)_1rem]";
