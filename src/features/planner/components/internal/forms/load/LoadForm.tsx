import { forwardRef } from "react";
import {
  type CalendarBookFormHandler,
  type SchedulableFormProps,
} from "#/types/internal/planner/planner-types";
import { ManualLoad } from "./ManualLoad";
import { IngestionLoad } from "./IngestionLoad";
import { useLoadForm } from "#/features/planner/hooks/useLoadForm";
import { LoadCreationTabs } from "#/features/planner/components/internal/forms/load/LoadCreationTabs";
import { LoadContext } from "#/features/planner/context/LoadContext";

export type LoadCreationType = "Manual" | "Ingestion";

export const LoadForm = forwardRef<
  CalendarBookFormHandler,
  SchedulableFormProps
>((props, ref) => {
  const {
    loadData,
    loadDataErrors,
    setLoadData,
    file,
    setFile,
    loadCreationType,
    setLoadCreationType,
  } = useLoadForm(props, ref);

  return (
    <div>
      <LoadCreationTabs
        current={loadCreationType}
        onChange={setLoadCreationType}
      />

      {loadCreationType === "Ingestion" ? (
        <IngestionLoad
          file={file}
          setFile={setFile}
          errorMessage={loadDataErrors.ingestionError}
        />
      ) : (
        <LoadContext.Provider value={{ loadData, setLoadData, loadDataErrors }}>
          <ManualLoad />
        </LoadContext.Provider>
      )}
    </div>
  );
});
