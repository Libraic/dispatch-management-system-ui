import { useEffect, useState } from "react";
import { inputFormStyle } from "../../../tailwind/tailwind.ts";
import {
  BLANK_STRING,
  EMPTY_ARRAY,
} from "../../../constants/common/global-constants.ts";
import { InputFormError } from "../../atoms/InputForm/InputFormError.tsx";
import { useToast } from "../../../hooks/useToast.ts";
import type { Renderable } from "../../../types/internal/classes/Renderable.ts";
import { InputFormLabel } from "../../atoms/InputForm/InputFormLabel.tsx";
import { useLiveSearch } from "../../../hooks/useLiveSearch.ts";
import { ToastRenderer } from "../Toast/ToastRenderer.tsx";
import { LiveSearchResultList } from "./LiveSearchResultList.tsx";
import { useBlur } from "../../../hooks/useBlur.ts";
import {
  LIVE_SEARCH_ENDPOINTS,
  type LiveSearchInputFormProps,
} from "../../../types/internal/live-search/live-search-data.ts";
import type { LiveSearchResult } from "../../../types/api/common/api-response-types.ts";
import { usePagination } from "../../../hooks/usePagination.ts";

/**
 * An input form that uses live search to retrieve data from an endpoint.
 * The trigger point for the live search is the input field. Check more about
 * live search parameters in the {@link LiveSearchInputFormProps} type definition.
 *
 * The central element of this component is the <strong>query</strong> state variable.
 * It stores the current value of the input field. By using debouncing, (check more in the {@link useLiveSearch} hook),
 * it makes a call to the provided endpoint to retrieve data based on the query.
 *
 * The LiveSearchInputForm component, being an Input Form, uses only one value as a query value.
 * The query parameter itself is configured via the <strong>searchKey</strong> parameter
 * when the component is called.
 *
 * If the query is a blank string, meaning nothing was typed in the input field,
 * no filtering will be applied when the data is fetched; therefore, you will receive
 * all the data from the endpoint (the data is paginated). To avoid unnecessary calls
 * when the parent component is mounted, a <strong>isLiveSearchActive</strong> state variable
 * is used that aims to check when the LiveSearchInputForm is active (was clicked).
 */
export const LiveSearchInputForm = <D,>({
  label,
  placeholder,
  value,
  entityType,
  isMandatory,
  errorText,
  joinableEntityId,
  saveData,
  cleanData,
  constructor,
  customSearchCriteria,
}: LiveSearchInputFormProps<D>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [items, setItems] = useState<Renderable[]>([]);
  const [borderColor, setBorderColor] = useState("border-light-grey");
  const [isLiveSearchActive, setIsLiveSearchActive] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(placeholder);
  const pagination = usePagination(entityType, joinableEntityId);
  const toast = useToast();
  const endpoint = LIVE_SEARCH_ENDPOINTS[entityType].endpoint;
  const searchField = LIVE_SEARCH_ENDPOINTS[entityType].searchField;
  const data: LiveSearchResult<D> = useLiveSearch(
    endpoint,
    searchField,
    query,
    isLiveSearchActive,
    pagination.getSize(),
    customSearchCriteria,
  );

  useEffect(() => {
    if (data.error !== null) {
      toast.withErrorMessage(data.error);
    } else {
      toast.reset();
      setItems(data.items.map((item) => new constructor(item) as Renderable));
    }
  }, [data, constructor, toast]);

  const liveSearchDivRef = useBlur(() => {
    setIsLiveSearchActive(false);
    setBorderColor("border-light-grey");
    setPlaceholderText(placeholder);
    setItems([]);
  });

  return (
    <div
      className="flex flex-col gap-y-2 w-fit min-h-[6.5rem]"
      ref={liveSearchDivRef}
    >
      <div
        className={`flex flex-col px-5 py-2 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] relative`}
      >
        <InputFormLabel label={label} isMandatory={isMandatory} />
        <input
          className={`${inputFormStyle} w-[19rem]`}
          placeholder={placeholderText}
          value={value !== BLANK_STRING ? value : query}
          onFocus={() => {
            setIsLiveSearchActive(true);
            setPlaceholderText(BLANK_STRING);
            if (value !== BLANK_STRING) {
              setQuery(value);
            }
            setBorderColor("border-solid-blue");
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value !== BLANK_STRING) {
              cleanData();
            }
          }}
        />
        {toast.isOk() && items.length > 0 && (
          <LiveSearchResultList
            items={items}
            areMoreBatchesAvailable={
              pagination.getSize() < pagination.getNumberOfRecords()
            }
            nextBatch={pagination.increaseSize}
            onClick={(item: Renderable) => {
              setQuery(BLANK_STRING);
              saveData(item);
              setItems(EMPTY_ARRAY);
            }}
          />
        )}
      </div>
      {!!errorText?.length && <InputFormError errorMessage={errorText} />}
      <ToastRenderer toast={toast} />
    </div>
  );
};
