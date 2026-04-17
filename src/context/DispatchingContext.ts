import { createContext } from "react";
import type { DispatchingContextData } from "./DispatchingContextData";

export const DispatchingContext = createContext<
  DispatchingContextData | undefined
>(undefined);
