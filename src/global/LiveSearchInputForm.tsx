import * as React from "react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";
import mandatoryFieldIcon from "../assets/global/mandatory-field.svg";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { getData } from "../service/live-search-service.ts";
import { Toast } from "../toast/Toast.tsx";
import { InputFormError } from "./InputFormError.tsx";
import type { Error } from "../types/api/common.ts";
import { useToast } from "../hooks/useToast.ts";

type LiveSearchInputFormProps<T> = {
  label: string;
  placeholder: string;
  value: string;
  endpoint: string;
  searchField: string;
  isMandatory: boolean;
  errorText?: string;
  saveData: (value: T) => void;
  cleanData: () => void;
  renderResult: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
};

export const LiveSearchInputForm = <T,>({
  label,
  placeholder,
  value,
  endpoint,
  searchField,
  isMandatory,
  errorText,
  saveData,
  cleanData,
  renderResult,
  getKey,
}: LiveSearchInputFormProps<T>) => {
  const [query, setQuery] = useState(BLANK_STRING);
  const [results, setResults] = useState<T[]>([]);
  const [borderColor, setBorderColor] = useState("border-light-grey");
  const [placeholderText, setPlaceholderText] = React.useState(placeholder);
  const toast = useToast();

  const handleFocus = () => {
    setPlaceholderText(BLANK_STRING);
    setQuery(value);
    setBorderColor("border-solid-blue");
  };

  const handleBlur = () => {
    if (placeholderText === BLANK_STRING) {
      setPlaceholderText(placeholder);
    }
    // setResults([]);
    setBorderColor("border-light-grey");
  };

  useEffect(() => {
    const debounced = debounce((value: string) => {
      if (value.trim().length > 0) {
        getData<T[], Error>(endpoint, searchField, value).then((result) => {
          if (result.error !== null) {
            toast.withErrorMessage(result.error.message);
          } else {
            toast.clear();
            setResults(result.data ?? []);
          }
        });
      } else {
        setResults([]);
      }
    }, 300);

    debounced(query);

    return () => debounced.cancel();
  }, [query, endpoint, searchField, toast]);

  return (
    <div className="flex flex-col gap-y-2 w-fit min-h-[6.5rem]">
      <div
        className={`flex flex-col px-5 py-2 justify-start items-start border-2 bg-white ${borderColor} rounded-[2rem] relative`}
      >
        <div className="flex flex-row items-center gap-x-1">
          {isMandatory && (
            <img
              className="w-[0.6rem]"
              src={mandatoryFieldIcon}
              alt="mandatory-icon"
            />
          )}
          <p className={inputFormLabelStyle}>{label}</p>
        </div>

        <input
          className={`${inputFormStyle} w-[19rem]`}
          placeholder={placeholderText}
          value={value !== BLANK_STRING ? value : query}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value !== BLANK_STRING) {
              cleanData();
            }
          }}
        />
        {toast.getMessage().length === 0 && results.length > 0 && (
          <div className="border-2 border-light-grey rounded-xl bg-white p-2 min-w-[8rem] absolute left-5 top-full mt-3 z-10">
            {results.map((item) => (
              <div
                key={getKey(item)}
                className="w-full rounded hover:bg-[#edf2fe] hover:text-solid-blue hover:cursor-pointer text-standard-size font-lato font-light text-center"
                onClick={() => {
                  setQuery(BLANK_STRING);
                  saveData(item);
                  setResults([]);
                }}
              >
                {renderResult(item)}
              </div>
            ))}
          </div>
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
