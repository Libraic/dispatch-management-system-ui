import type { ChangeEvent } from "react";
import * as React from "react";

export const CheckBox: React.FC<{
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ isChecked, onChange }) => {
  return (
    <div className="flex items-center justify-center bg-[#f5f7fc] border-x-3 border-b-3 border-[#e6ebfa] w-full h-full">
      <input
        type="checkbox"
        className="w-4 h-4 hover:cursor-pointer border-[#e6ebfa]"
        checked={isChecked}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
