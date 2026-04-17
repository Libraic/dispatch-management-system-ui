import React, { useContext, useEffect, useImperativeHandle } from "react";
import type {
  SchedulableFormProps,
  SubmitSuccess,
} from "#/types/internal/planner/planner-types";
import {
  fromGetLoadResponseToLoadData,
  getBlankLoadData,
} from "#/utils/planner/load-utils";
import {
  getStartingPointLocation,
  ingestDocument,
  upsertLoad,
} from "#/features/planner/api/loads.api";
import { getErrorsIfPresent } from "#/utils/planner/load-error-utils";
import { MISSING_DOCUMENT_ERROR } from "#/constants/error/error-message-constants";
import { DispatchingContext } from "#/context/DispatchingContext";
import { useLoadData } from "#/features/planner/hooks/useLoadData";
import { ToastContext } from "#/ui/Toast/context/ToastContext";

export function useLoadForm(
  loadFormProps: SchedulableFormProps,
  ref: React.Ref<any>,
) {
  const { day, workforce, id } = loadFormProps;
  const { showToast } = useContext(ToastContext);
  const {
    loadData,
    loadDataErrors,
    setLoadData,
    file,
    setFile,
    loadCreationType,
    setLoadCreationType,
    setLoadDataErrors,
  } = useLoadData(workforce, day, id);

  const context = useContext(DispatchingContext)!;

  const handleIngestion = async (): Promise<SubmitSuccess> => {
    if (!file) {
      setLoadDataErrors({
        ingestionError: MISSING_DOCUMENT_ERROR,
      });
      return "stay-open";
    }

    const response = await ingestDocument(file);

    if (!response.ok) {
      throw new Error(response.error.message);
    }

    const ingestedLoadData = fromGetLoadResponseToLoadData(response.data);

    setLoadData(ingestedLoadData);
    setLoadCreationType("Manual");

    return "stay-open";
  };

  const handleManualSubmit = async (): Promise<SubmitSuccess> => {
    const loadErrors = getErrorsIfPresent(loadData);

    if (Object.keys(loadErrors).length !== 0) {
      setLoadDataErrors(loadErrors);
      return "stay-open";
    }

    const response = await upsertLoad(loadData, workforce.relationId);

    if (!response.ok) {
      throw new Error(response.error.message);
    }

    const upsertedLoadData = fromGetLoadResponseToLoadData(response.data);

    context.upsertLoadFn(workforce, upsertedLoadData);

    return "close-modal";
  };

  const submit = async (): Promise<SubmitSuccess> => {
    if (loadCreationType === "Ingestion") {
      return handleIngestion();
    }

    return handleManualSubmit();
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    const fetchData = async () => {
      if (!day) return;

      const response = await getStartingPointLocation(
        workforce.relationId,
        new Date(day),
      );

      if (!response.ok) {
        showToast(response.error.message);
        return;
      }

      setLoadData(getBlankLoadData(day, response.data.location));
    };

    fetchData().then(() => {});
  }, [day, setLoadData, showToast, workforce.relationId]);

  return {
    loadData,
    loadDataErrors,
    setLoadData,
    file,
    setFile,
    loadCreationType,
    setLoadCreationType,
  };
}
