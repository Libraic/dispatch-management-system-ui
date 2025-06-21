import { inputFormLabelStyle, selectFormStyle } from "../utils/tailwind.ts";
import { type ReactNode, useState } from "react";
import { LOAD_MORE_ELEMENTS } from "../utils/constants/global.ts";
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
  const [borderColor, setBorderColor] = useState("border-light-grey");

  return (
    <div className={`${borderColor}`}>
      <p className={`${inputFormLabelStyle} ml-2`}>{label}</p>
      <select
        className={`${selectFormStyle} ${formWidth} ${borderColor}`}
        value={initialValue}
        onFocus={() => setBorderColor("border-solid-blue")}
        onBlur={() => setBorderColor("border-light-grey")}
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
