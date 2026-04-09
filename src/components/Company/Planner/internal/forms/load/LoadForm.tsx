import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  type CalendarBookFormHandler,
  CalendarBookModalTypes,
  type FormProps,
  type LoadData,
  type LoadDataError,
  type PlannerError,
} from "../../../../../../types/internal/planner/planner-types.ts";
import { getErrorsIfPresent } from "../../../../../../utils/planner/load-error-utils.ts";
import { createStateData } from "../../../../../../utils/global/props-utils.ts";
import {
  getStartingPointLocation,
  ingestDocument,
} from "../../../../../../service/loadService.ts";
import { DispatchingContext } from "../../../../../../context/DispatchingContext.ts";
import { getBlankLoadData } from "../../../../../../utils/planner/load-utils.ts";
import { SYSTEM_FONT_LIGHT } from "../../../../../../tailwind/tailwind-font-vars.ts";
import {
  HOVER_TEXT_NORMAL_COLOR,
  TEXT_NORMAL_COLOR,
} from "../../../../../../tailwind/tailwind-colors-vars.ts";
import { BLANK_STRING } from "../../../../../../constants/common/global-constants.ts";
import { ManualLoad } from "./ManualLoad.tsx";
import { IngestionLoad } from "./IngestionLoad.tsx";
import { MISSING_DOCUMENT_ERROR } from "../../../../../../constants/error/error-message-constants.ts";

type LoadCreationType = "Manual" | "Ingestion";
const loadCreationTypes: LoadCreationType[] = ["Ingestion", "Manual"];

export const LoadForm = forwardRef<CalendarBookFormHandler, FormProps>(
  (loadFormProps, ref) => {
    const { day, workforce, id } = loadFormProps;
    const initialLoadData =
      id && workforce
        ? workforce.loads.filter((load) => load.id === id)[0]
        : getBlankLoadData(day!!);
    const [loadDataErrors, setLoadDataErrors] = useState<LoadDataError>({});
    const [file, setFile] = useState<File | null>(null);
    const [loadCreationType, setLoadCreationType] =
      useState<LoadCreationType>("Ingestion");
    const [loadData, setLoadData] = useState<LoadData>(initialLoadData);
    const loadStateData = createStateData(
      loadData,
      loadDataErrors,
      setLoadData,
    );
    const context = useContext(DispatchingContext);

    const submit = async () => {
      if (loadCreationType === "Ingestion") {
        if (!file) {
          setLoadDataErrors({
            ingestionError: MISSING_DOCUMENT_ERROR,
          });
          return {
            type: "InternalError",
          } as PlannerError;
        } else {
          await ingestDocument(file);
        }
      } else {
        const loadErrors = getErrorsIfPresent(loadData);
        if (Object.keys(loadErrors).length !== 0) {
          setLoadDataErrors(loadErrors);
          return {
            type: "InternalError",
          } as PlannerError;
        }

        const errorMessage = await context!!.upsertLoadFn(workforce, loadData);
        return {
          type: "ApiError",
          message: errorMessage ?? undefined,
        } as PlannerError;
      }

      return {
        type: "NoError",
      } as PlannerError;
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
                setLoadData(getBlankLoadData(day, location));
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
              onClick={() => setLoadCreationType(type)}
            >
              <p
                className={`hover:cursor-pointer ${HOVER_TEXT_NORMAL_COLOR} ${loadCreationType === type ? TEXT_NORMAL_COLOR : "text-gray-400"}`}
              >
                {type}
              </p>
              <p className="mx-[1.25rem] text-gray-400">
                {index !== CalendarBookModalTypes.length - 1
                  ? "|"
                  : BLANK_STRING}
              </p>
            </div>
          ))}
        </div>
        {loadCreationType === "Ingestion" ? (
          <IngestionLoad
            file={file}
            setFile={(file: File) => {
              setLoadDataErrors({});
              setFile(file);
            }}
            errorMessage={loadDataErrors.ingestionError}
          />
        ) : (
          <ManualLoad loadStateData={loadStateData} />
        )}
      </div>
    );
  },
);
