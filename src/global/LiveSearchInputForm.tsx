import { useEffect, useState } from "react";
import { inputFormStyle } from "../utils/tailwind.ts";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { Toast } from "../toast/Toast.tsx";
import { InputFormError } from "./InputFormError.tsx";
import { useToast } from "../hooks/useToast.ts";
import type { LiveSearchInputFormProps } from "../types/live-search.ts";
import { LiveSearchResultList } from "./LiveSearchResultList.tsx";
import type { Renderable } from "../types/api/Renderable.ts";
import { LiveSearchEndpoints } from "../types/forms.ts";
import { InputFormLabel } from "./InputFormLabel.tsx";
import {
  type LiveSearchResult,
  useLiveSearch,
} from "../hooks/useLiveSearch.ts";

export const LiveSearchInputForm = <D,>({
  label,
  placeholder,
  value,
  searchKey,
  isMandatory,
  errorText,
  saveData,
  cleanData,
  constructor,
}: LiveSearchInputFormProps<D>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [items, setItems] = useState<Renderable[]>([]);
  const [borderColor, setBorderColor] = useState("border-light-grey");
  const [placeholderText, setPlaceholderText] = useState(placeholder);
  const toast = useToast();
  const endpoint = LiveSearchEndpoints[searchKey].endpoint;
  const searchField = LiveSearchEndpoints[searchKey].searchField;
  const data: LiveSearchResult<D> = useLiveSearch(endpoint, searchField, query);

  useEffect(() => {
    if (data.error !== null) {
      toast.withErrorMessage(data.error);
    } else {
      toast.clear();
      setItems(data.items.map((item) => new constructor(item) as Renderable));
    }
  }, [data, constructor]);

  return (
    <div className="flex flex-col gap-y-2 w-fit min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-2 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] relative`}
      >
        <InputFormLabel label={label} isMandatory={isMandatory} />

        <input
          className={`${inputFormStyle} w-[19rem]`}
          placeholder={placeholderText}
          value={value !== BLANK_STRING ? value : query}
          onFocus={() => {
            setPlaceholderText(BLANK_STRING);
            setQuery(value);
            setBorderColor("border-solid-blue");
          }}
          onBlur={() => {
            if (placeholderText === BLANK_STRING) {
              setPlaceholderText(placeholder);
            }
            setItems([]);
            setBorderColor("border-light-grey");
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value !== BLANK_STRING) {
              cleanData();
            }
          }}
        />
        {toast.getMessage().length === 0 && items.length > 0 && (
          <LiveSearchResultList
            items={items}
            onClick={(item: Renderable) => {
              setQuery(BLANK_STRING);
              saveData(item);
              setItems([]);
            }}
          />
        )}
      </div>
      {!!errorText?.length && <InputFormError errorMessage={errorText} />}
      {toast.getMessage().length > 0 && (
        <Toast
          key={toast.getIdentifier()}
          message={toast.getMessage()}
          type={toast.getOperationResult()}
        />
      )}
    </div>
  );
};
