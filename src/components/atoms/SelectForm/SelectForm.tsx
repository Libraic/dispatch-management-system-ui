import {
  inputFormLabelStyle,
  selectFormStyle,
} from "../../../tailwind/tailwind.ts";
import { type ReactNode, useState } from "react";
import type { SelectFormData } from "../../../types/internal/forms/select-form-types.ts";

export const SelectForm = <T extends ReactNode, D extends string | number>({
  label,
  initialValue,
  data,
  setElement,
}: SelectFormData<T, D>) => {
  const [borderColor, setBorderColor] = useState("border-light-grey");

  return (
    <div className={`${borderColor}`}>
      <p className={`${inputFormLabelStyle} ml-2`}>{label}</p>
      <select
        className={`${selectFormStyle} ${borderColor} min-w-40 min-h-[2.2rem]`}
        value={initialValue}
        onFocus={() => setBorderColor("border-solid-blue")}
        onBlur={() => setBorderColor("border-light-grey")}
        onChange={(e) => {
          setElement(e.target.value);
          // if (e.target.value === LOAD_MORE_ELEMENTS) {
          //   pagination?.setLoadNext(true);
          // }
        }}
      >
        {data.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
        {/*{nextUrl && nextUrl.length > 0 && (*/}
        {/*  <option key={Date.now().toString()} value={LOAD_MORE_ELEMENTS}>*/}
        {/*    {LOAD_MORE_ELEMENTS}*/}
        {/*  </option>*/}
        {/*)}*/}
      </select>
    </div>
  );
};
