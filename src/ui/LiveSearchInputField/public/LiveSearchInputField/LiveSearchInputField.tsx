import { useEffect, useRef, useState } from "react";
import { BLANK_STRING, EMPTY_ARRAY } from "#/constants/common/global-constants";
import type { Renderable } from "#/types/internal/classes/Renderable";
import { useLiveSearch } from "#/ui/LiveSearchInputField/public/LiveSearchInputField/useLiveSearch";
import { useUnfocus } from "#/hooks/useUnfocus";
import { usePagination } from "#/hooks/usePagination";
import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { InputFieldSearchResult } from "#/ui/LiveSearchInputField/internal/InputFieldSearchResult";
import { DEFAULT_SIZE } from "#/shared/api/constants/apiQuery.constants";
import type { TailwindProperties } from "#/types/internal/style";
import {
  LIVE_SEARCH_ENDPOINTS,
  type LiveSearchInputFieldProps,
} from "#/ui/LiveSearchInputField/public/LiveSearchInputField/LiveSearchInputField.types";
import type { LiveSearchResult } from "#/shared/types/api.types";

/**
 * An input form that uses live search to retrieve data from an endpoint.
 * The trigger point for the live search is the input field. Check more about
 * live search parameters in the {@link LiveSearchInputFieldProps} type definition.
 *
 * The central element of this component is the <strong>query</strong> state variable.
 * It stores the current value of the input field. By using debouncing, (check more in the {@link useLiveSearch} hook),
 * it makes a call to the provided endpoint to retrieve data based on the query.
 *
 * The LiveSearchInputField component, being an Input Form, uses only one value as a query value.
 * The query parameter itself is configured via the <strong>searchKey</strong> parameter
 * when the component is called.
 *
 * If the query is a blank string, meaning nothing was typed in the input field,
 * no filtering will be applied when the data is fetched; therefore, you will receive
 * all the data from the endpoint (the data is paginated). To avoid unnecessary calls
 * when the parent component is mounted, a <strong>isLiveSearchActive</strong> state variable
 * is used that aims to check when the LiveSearchInputField is active (was clicked).
 */
export const LiveSearchInputField = <D,>({
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
  tailwindProperties,
}: LiveSearchInputFieldProps<D> & {
  tailwindProperties?: TailwindProperties;
}) => {
  const [query, setQuery] = useState(value);
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

  const weight = tailwindProperties?.width ?? "w-fit";

  useEffect(() => {
    setItems(data.items.map((item) => new constructor(item) as Renderable));
  }, [data, constructor]);

  const inputFormContainerRef = useRef<HTMLDivElement>(null);
  const liveSearchDivRef = useUnfocus(() => {
    setIsLiveSearchActive(false);
    setPlaceholderText(placeholder);
    setItems(EMPTY_ARRAY);
  }, [inputFormContainerRef]);

  return (
    <div>
      <div className={`flex flex-col gap-y-2 ${weight}`}>
        <TextualInputField
          ref={inputFormContainerRef}
          label={label}
          placeholder={placeholderText}
          inputFieldValue={query}
          onFocus={() => {
            setIsLiveSearchActive(true);
            setPlaceholderText(BLANK_STRING);
            if (value !== BLANK_STRING) {
              setQuery(value);
            }
          }}
          saveInputData={(text: string) => {
            setQuery(text);
            if (value !== BLANK_STRING && cleanData) {
              cleanData();
            }
          }}
          isMandatory={isMandatory}
          errorMessage={errorMessage}
        />
      </div>
      {isLiveSearchActive && (
        <InputFieldSearchResult
          ref={liveSearchDivRef}
          items={items}
          pagination={pagination}
          onItemSelected={(item: Renderable) => {
            setQuery(item.renderOnForm());
            saveData(item);
            setItems(EMPTY_ARRAY);
            setIsLiveSearchActive(false);
          }}
        />
      )}
    </div>
  );
};
