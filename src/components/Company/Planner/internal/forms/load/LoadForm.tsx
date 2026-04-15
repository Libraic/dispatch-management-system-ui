import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import {
  type CalendarBookFormHandler,
  CalendarBookModalTypes,
  type FormProps,
  type SubmitSuccess,
} from "../../../../../../types/internal/planner/planner-types.ts";
import { getErrorsIfPresent } from "../../../../../../utils/planner/load-error-utils.ts";
import {
  getStartingPointLocation,
  ingestDocument,
  upsertLoad,
} from "../../../../../../service/loadService.ts";
import { DispatchingContext } from "../../../../../../context/DispatchingContext.ts";
import {
  fromGetLoadResponseToLoadData,
  getBlankLoadData,
} from "../../../../../../utils/planner/load-utils.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../../../tailwind/tailwind-font-vars.ts";
import {
  HOVER_TEXT_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "../../../../../../tailwind/tailwind-colors-vars.ts";
import {
  BLANK_STRING,
  PIPE,
} from "../../../../../../constants/common/global-constants.ts";
import { ManualLoad } from "./ManualLoad.tsx";
import { IngestionLoad } from "./IngestionLoad.tsx";
import { MISSING_DOCUMENT_ERROR } from "../../../../../../constants/error/error-message-constants.ts";
import { useLoadData } from "../../../../../../hooks/useLoadData.ts";

export type LoadCreationType = "Manual" | "Ingestion";
const loadCreationTypes: LoadCreationType[] = ["Ingestion", "Manual"];

export const LoadForm = forwardRef<CalendarBookFormHandler, FormProps>(
  (loadFormProps, ref) => {
    const { day, workforce, id } = loadFormProps;
    const loadCriteria = useLoadData(workforce, day, id);
    const context = useContext(DispatchingContext)!!;

    const submit = async (): Promise<SubmitSuccess> => {
      if (loadCriteria.loadCreationType === "Ingestion") {
        if (!loadCriteria.file) {
          loadCriteria.setLoadDataErrors({
            ingestionError: MISSING_DOCUMENT_ERROR,
          });
          return "stay-open";
        }

        const response = await ingestDocument(loadCriteria.file);

        if (!response.ok) {
          throw new Error(response.error);
        }

        const ingestedLoadData = fromGetLoadResponseToLoadData(response.data);

        loadCriteria.loadStateData.setData(ingestedLoadData);
        loadCriteria.setLoadCreationType("Manual");

        return "stay-open";
      }

      const loadErrors = getErrorsIfPresent(loadCriteria.loadStateData.data);

      if (Object.keys(loadErrors).length !== 0) {
        loadCriteria.setLoadDataErrors(loadErrors);
        return "stay-open";
      }

      const upsertLoadResponse = await upsertLoad(
        loadCriteria.loadStateData.data,
        workforce.relationId,
      );

      if (!upsertLoadResponse.ok) {
        throw new Error(upsertLoadResponse.error);
      }

      const upsertedLoadData = fromGetLoadResponseToLoadData(
        upsertLoadResponse.data,
      );

      context.upsertLoadFn(workforce, upsertedLoadData);

      return "close-modal";
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    useEffect(() => {
      if (day) {
        getStartingPointLocation(workforce.relationId, new Date(day)).then(
          (data) => {
            if (data.data) {
              const location = data.data.location;
              if (location !== null) {
                loadCriteria.loadStateData.setData(
                  getBlankLoadData(day, location),
                );
              }
            }
          },
        );
      }
    }, [day, workforce.relationId]);

    return (
      <div>
        <div
          className={`flex flex-row items-center justify-center mb-[2rem] ${SYSTEM_FONT_LIGHT} ml-[2rem] text-[0.85rem]`}
        >
          {loadCreationTypes.map((type, index) => (
            <div
              className="flex flex-row"
              key={type}
              onClick={() => loadCriteria.setLoadCreationType(type)}
            >
              <p
                className={`hover:cursor-pointer ${HOVER_TEXT_NORMAL_COLOR} ${loadCriteria.loadCreationType === type ? TEXT_NORMAL_COLOR : "text-gray-400"}`}
              >
                {type}
              </p>
              <p className="mx-[1.25rem] text-gray-400">
                {index !== CalendarBookModalTypes.length - 1
                  ? PIPE
                  : BLANK_STRING}
              </p>
            </div>
          ))}
        </div>
        {loadCriteria.loadCreationType === "Ingestion" ? (
          <IngestionLoad
            file={loadCriteria.file}
            setFile={(file: File) => {
              loadCriteria.setLoadDataErrors({});
              loadCriteria.setFile(file);
            }}
            errorMessage={loadCriteria.loadStateData.error.ingestionError}
          />
        ) : (
          <ManualLoad loadStateData={loadCriteria.loadStateData} />
        )}
      </div>
    );
  },
);
