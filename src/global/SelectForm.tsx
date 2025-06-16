import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";
import type { ReactNode } from "react";
import { LOAD_MORE_ELEMENTS } from "../utils/global-constants.ts";
import type { SelectFormData } from "../types/global.ts";

export const SelectForm = <T extends ReactNode, D extends string | number>({
  label,
  formWidth,
  initialValue,
  data,
  pagination,
  setElement,
}: SelectFormData<T, D>) => {
  const nextUrl = pagination?.getNextUrl();
  return (
    <div>
      <p className={inputFormLabelStyle}>{label}</p>
      <select
        className={`${inputFormStyle} ${formWidth}`}
        value={initialValue}
        onChange={(e) => {
          if (e.target.value === LOAD_MORE_ELEMENTS) {
            pagination?.setLoadNext(true);
          } else {
            setElement(e.target.value);
          }
        }}
      >
        {data.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
        {nextUrl && nextUrl.length > 0 && (
          <option key={Date.now().toString()} value={LOAD_MORE_ELEMENTS}>
            {LOAD_MORE_ELEMENTS}
          </option>
        )}
      </select>
    </div>
  );
};
