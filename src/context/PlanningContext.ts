import { createContext } from "react";
import type { PlanningContextData } from "./PlanningContextData.ts";

export const PlanningContext = createContext<PlanningContextData | undefined>(
  undefined,
);
