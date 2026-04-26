import { type ReactNode, useState } from "react";
import { BORDER_NORMAL_COLOR } from "#/shared/constants/tailwind/tailwindColors.constants";
import type { TailwindProperties } from "#/types/internal/style";
import { InputFieldLabel } from "#/ui/InputField/components/public/InputFieldLabel";

type SelectFormData<T extends ReactNode, D extends string | number> = {
  initialValue: D;
  data: T[];
  setElement: (value: string) => void;
  label: string;
  tailwindProperties?: TailwindProperties;
};

export const SelectorField = <T extends ReactNode, D extends string | number>({
  initialValue,
  data,
  setElement,
  label,
  tailwindProperties,
}: SelectFormData<T, D>) => {
  const [borderColor, setBorderColor] = useState("border-light-grey");

  return (
    <div className={`relative ${borderColor}`}>
      <InputFieldLabel
        label={label}
        isFocused={borderColor === BORDER_NORMAL_COLOR}
        isMandatory={false}
      />
      <select
        className={`
          flex items-center py-0.5 
          ${tailwindProperties?.maxWeight || "w-fit"} 
          bg-transparent rounded-[0.75rem] 
          border-2 focus:outline-none focus:ring-0 
          text-center font-light text-[0.9rem] 
          hover:cursor-pointer select-none ${borderColor} h-[2.5rem]
        `}
        value={initialValue}
        onFocus={() => setBorderColor(BORDER_NORMAL_COLOR)}
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
