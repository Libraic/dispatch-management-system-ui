import { inputFormLabelStyle, inputFormStyle } from "../utils/tailwind.ts";
import type { SelectFormData } from "../types/authentication.ts";
import type { ReactNode } from "react";

export const SelectForm = <T extends ReactNode, D extends string | number>({
  label,
  formWidth,
  initialValue,
  data,
  setElement,
}: SelectFormData<T, D>) => {
  return (
    <div>
      <p className={inputFormLabelStyle}>{label}</p>
      <select
        className={`${inputFormStyle} ${formWidth}`}
        value={initialValue}
        onChange={(e) => setElement(e.target.value)}
      >
        {data.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
};
