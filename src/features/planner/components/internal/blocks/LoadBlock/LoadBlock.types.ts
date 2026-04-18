import type {
  DriverWorkforce,
  LoadData,
} from "#/types/internal/planner/planner-types";

export type DisplayMode = "full" | "compact" | "minimal" | "hidden";

export type LoadBlockProps = {
  driverLoadData: DriverWorkforce;
  load: LoadData;
};
