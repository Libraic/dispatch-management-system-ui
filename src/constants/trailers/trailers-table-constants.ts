import type { Column } from "#/shared/types/view.types";

export const TRAILERS_VIEW_COLUMNS: Column[] = [
  { key: "trailerNumber", label: "Trailer Number" },
  { key: "vinNumber", label: "VIN Number" },
  { key: "trailerYear", label: "Trailer Year" },
  { key: "equipmentType", label: "Equipment Type" },
  { key: "trailerMake", label: "Trailer Make" },
];

export const TRAILERS_VIEW_COLUMNS_LAYOUT =
  "grid-cols-[minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(16rem,1fr)_minmax(20rem,2fr)_1rem]";
