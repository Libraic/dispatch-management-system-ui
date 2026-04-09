import { getBlankLoadData } from "../utils/planner/load-utils.ts";
import { useState } from "react";
import type {
  DriverWorkforce,
  LoadData,
  LoadDataError,
} from "../types/internal/planner/planner-types.ts";
import { createStateData } from "../utils/global/props-utils.ts";
import type { LoadCreationType } from "../components/Company/Planner/internal/forms/load/LoadForm.tsx";

export const useLoadData = (
  workforce: DriverWorkforce,
  day?: string,
  id?: string,
) => {
  const initialLoadData =
    id && workforce
      ? workforce.loads.filter((load) => load.id === id)[0]
      : getBlankLoadData(day!!);
  const [loadDataErrors, setLoadDataErrors] = useState<LoadDataError>({});
  const [file, setFile] = useState<File | null>(null);
  const [loadCreationType, setLoadCreationType] = useState<LoadCreationType>(
    id ? "Manual" : "Ingestion",
  );
  const [loadData, setLoadData] = useState<LoadData>(initialLoadData);
  const loadStateData = createStateData(loadData, loadDataErrors, setLoadData);

  return {
    loadStateData,
    file,
    setFile,
    loadCreationType,
    setLoadCreationType,
    setLoadDataErrors,
  };
};
