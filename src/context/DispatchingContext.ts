import { createContext } from "react";
import type { DispatchingContextData } from "./DispatchingContextData.ts";

export const DispatchingContext = createContext<
  DispatchingContextData | undefined
>(undefined);
