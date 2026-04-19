import { type ReactNode, useState } from "react";
import { BORDER_SOLID_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";

type SelectFormData<T extends ReactNode, D extends string | number> = {
  initialValue: D;
  data: T[];
  setElement: (value: string) => void;
  label?: string;
};

export const SelectorField = <T extends ReactNode, D extends string | number>({
  initialValue,
  data,
  setElement,
  label,
}: SelectFormData<T, D>) => {
  const [borderColor, setBorderColor] = useState("border-light-grey");

  return (
    <div className={`${borderColor}`}>
      {label && <p className={`font-normal ml-2`}>{label}</p>}
      <select
        className={`flex items-center py-0.5 w-fit font-light text-[0.9rem] bg-transparent rounded-[0.75rem] border-2 focus:outline-none focus:ring-0 text-center hover:cursor-pointer select-none ${borderColor} min-w-[8rem] min-h-[2.5rem]`}
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
