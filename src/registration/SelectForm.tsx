import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";
import * as React from "react";
import type { SelectFormData } from "../types/authentication.ts";

export const SelectForm = <T,>({
  label,
  formWidth,
  data,
  setElement,
}: SelectFormData<T>) => {
  return (
    <div>
      <p className={inputFormLabelStyle}>{label}</p>
      <select
        className={`${inputFormStyle} ${formWidth}`}
        onChange={(e) => setElement(e.target.value)}
      >
        {data.map((name, index) => (
          <option key={index} value={index + 1}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
