import { useState } from "react";
import type {
  DriverWorkforce,
  LoadData,
  LoadDataError,
} from "#/types/internal/planner/planner-types";
import type { LoadCreationType } from "#/features/planner/components/internal/forms/load/LoadForm";
import { getBlankLoadData } from "#/features/planner/utils/loads.utils";

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
  return {
    loadData,
    loadDataErrors,
    setLoadData,
    file,
    setFile,
    loadCreationType,
    setLoadCreationType,
    setLoadDataErrors,
  };
};
