import { LoadFormLoadLocations } from "./LoadFormLoadLocations.tsx";
import { LoadFormRevenue } from "./LoadFormRevenue.tsx";
import { LoadFormBrokerData } from "./LoadFormBrokerData.tsx";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type {
  CalendarBookFormHandler,
  FormProps,
  LoadData,
  LoadDataError,
} from "../../../../../types/internal/planner/planner-types.ts";
import {
  getBlankLoadDataError,
  getErrorsIfPresent,
} from "../../../../../utils/planner/load-error-utils.ts";
import { createStateData } from "../../../../../utils/global/props-utils.ts";
import { getStartingPointLocation } from "../../../../../service/loadService.ts";
import { DispatchingContext } from "../../../../../context/DispatchingContext.ts";
import { getBlankLoadData } from "../../../../../utils/planner/load-utils.ts";

export const LoadForm = forwardRef<CalendarBookFormHandler, FormProps>(
  (loadFormProps, ref) => {
    const { day, workforce, id } = loadFormProps;
    const initialLoadData =
      id && workforce
        ? workforce.loads.filter((load) => load.id === id)[0]
        : getBlankLoadData(day!!);
    const [loadDataErrors, setLoadDataErrors] = useState<LoadDataError>(
      getBlankLoadDataError(),
    );
    const [loadData, setLoadData] = useState<LoadData>(initialLoadData);
    const loadStateData = createStateData(
      loadData,
      loadDataErrors,
      setLoadData,
    );
    const context = useContext(DispatchingContext);

    const submit = () => {
      const { isError, loadErrors } = getErrorsIfPresent(loadData);
      if (isError) {
        setLoadDataErrors(loadErrors);
        return false;
      }

      context!!.upsertLoadDataFn(workforce.driver!!, loadData);
      return true;
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
      <div className="flex flex-col gap-y-[1.15rem]">
        <LoadFormLoadLocations loadStateData={loadStateData} />
        <LoadFormRevenue loadStateData={loadStateData} />
        <LoadFormBrokerData loadStateData={loadStateData} />
      </div>
    );
  },
);
