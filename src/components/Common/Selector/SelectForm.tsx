import {
  INPUT_FORM_LABEL_STYLE,
  SELECT_FORM_STYLE,
} from "../../../tailwind/tailwind.ts";
import { type ReactNode, useState } from "react";
import type { SelectFormData } from "../../../types/internal/forms/select-form-types.ts";
import { BORDER_SOLID_COLOR } from "../../../tailwind/tailwind-colors-vars.ts";

export const SelectForm = <T extends ReactNode, D extends string | number>({
  initialValue,
  data,
  setElement,
  label,
}: SelectFormData<T, D>) => {
  const [borderColor, setBorderColor] = useState("border-light-grey");

  return (
    <div className={`${borderColor}`}>
      {label && <p className={`${INPUT_FORM_LABEL_STYLE} ml-2`}>{label}</p>}
      <select
        className={`${SELECT_FORM_STYLE} ${borderColor} min-w-[8rem] min-h-[2.5rem]`}
        value={initialValue}
        onFocus={() => setBorderColor(BORDER_SOLID_COLOR)}
        onBlur={() => setBorderColor("border-light-grey")}
        onChange={(e) => {
          setElement(e.target.value);
        }}
      >
        {data.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
};
