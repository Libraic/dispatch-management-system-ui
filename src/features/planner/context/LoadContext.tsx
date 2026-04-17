import type {
  LoadData,
  LoadDataError,
} from "#/types/internal/planner/planner-types";
import React, { createContext } from "react";

interface LoadContextData {
  loadData: LoadData;
  setLoadData: React.Dispatch<React.SetStateAction<LoadData>>;
  loadDataErrors: LoadDataError;
}

export const LoadContext = createContext<LoadContextData | null>(null);
