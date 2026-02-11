import { useEffect, useState } from "react";
import {
  BLANK_STRING,
  EMPTY_ARRAY,
} from "../../../../constants/common/global-constants.ts";
import { InputFormError } from "../../InputForm/public/InputFormError.tsx";
import type { Renderable } from "../../../../types/internal/classes/Renderable.ts";
import { useLiveSearch } from "../../../../hooks/useLiveSearch.ts";
import { useUnfocus } from "../../../../hooks/useUnfocus.ts";
import {
  LIVE_SEARCH_ENDPOINTS,
  type LiveSearchInputFormProps,
} from "../../../../types/internal/live-search/live-search-data.ts";
import { usePagination } from "../../../../hooks/usePagination.ts";
import { InputForm } from "../../InputForm/public/InputForm.tsx";
import type { LiveSearchResult } from "../../../../types/api/common/api-response-types.ts";
import { InputFormSearchResult } from "./InputFormSearchResult.tsx";
import { DEFAULT_SIZE } from "../../../../constants/api/api-query-constants.ts";

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
  errorMessage,
  isMandatory,
  joinableEntityId,
  joinableEntityName,
  saveData,
  cleanData,
  constructor,
  customSearchCriteria,
}: LiveSearchInputFormProps<D>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [items, setItems] = useState<Renderable[]>([]);
  const [isLiveSearchActive, setIsLiveSearchActive] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(placeholder);
  const pagination = usePagination(
    entityType,
    DEFAULT_SIZE,
    joinableEntityId,
    joinableEntityName,
  );
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
    setItems(data.items.map((item) => new constructor(item) as Renderable));
  }, [data, constructor]);

  const liveSearchDivRef = useUnfocus(() => {
    setIsLiveSearchActive(false);
    setPlaceholderText(placeholder);
    setItems(EMPTY_ARRAY);
  });

  return (
    <div
      className="flex flex-col gap-y-2 w-fit min-h-[6.5rem]"
      ref={liveSearchDivRef}
    >
      <InputForm
        label={label}
        placeholder={placeholderText}
        type="text"
        inputFieldValue={value !== BLANK_STRING ? value : query}
        onFocus={() => {
          setIsLiveSearchActive(true);
          setPlaceholderText(BLANK_STRING);
          if (value !== BLANK_STRING) {
            setQuery(value);
          }
        }}
        saveInputData={(value: string) => {
          setQuery(value);
          if (value !== BLANK_STRING) {
            cleanData();
          }
        }}
        isMandatory={isMandatory}
      />
      <InputFormSearchResult
        items={items}
        pagination={pagination}
        onItemSelected={(item: Renderable) => {
          setQuery(BLANK_STRING);
          saveData(item);
          setItems(EMPTY_ARRAY);
          setIsLiveSearchActive(false);
        }}
      />
      {!!errorMessage?.length && <InputFormError errorMessage={errorMessage} />}
    </div>
  );
};
