import { createContext } from "react";
import type { LoadsTableContextData } from "#/features/loads/context/context.types";

export const LoadsTableContext = createContext<
  LoadsTableContextData | undefined
>(undefined);
