import { createContext } from "react";
import type { DriversTableContextData } from "#/features/drivers/context/context.types";

export const DriversTableContext = createContext<
  DriversTableContextData | undefined
>(undefined);
