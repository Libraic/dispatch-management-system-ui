import type {
  DriverWorkforce,
  LoadData,
  LoadStatus,
} from "#/types/internal/planner/planner-types";

export type DisplayMode = "full" | "compact" | "minimal" | "hidden";

export type LoadBlockProps = {
  driverLoadData: DriverWorkforce;
  load: LoadData;
};

export type LoadBlockStyle = {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
};

export type LoadBlockStyleRecord = Record<LoadStatus, LoadBlockStyle>;
