import type { LoadCreationType } from "#/features/planner/components/internal/forms/load/LoadForm";
import { TEXT_NORMAL_COLOR } from "#/tailwind/tailwind-colors-vars";
import { PIPE } from "#/constants/common/global-constants";
import React from "react";

const loadCreationTypes: LoadCreationType[] = ["Ingestion", "Manual"];

type LoadCreationTabsProps = {
  current: LoadCreationType;
  onChange: (type: LoadCreationType) => void;
};

export const LoadCreationTabs: React.FC<LoadCreationTabsProps> = ({
  current,
  onChange,
}) => {
  return (
    <div className={`flex justify-center items-center mb-[2rem] font-light`}>
      {loadCreationTypes.map((type, index) => (
        <div
          key={type}
          onClick={() => onChange(type)}
          className="flex items-center text-[0.9rem]"
        >
          <p
            className={`cursor-pointer ${current === type ? TEXT_NORMAL_COLOR : "text-gray-400"}`}
          >
            {type}
          </p>
          {index < loadCreationTypes.length - 1 && (
            <span className="mx-[1.25rem] text-gray-400">{PIPE}</span>
          )}
        </div>
      ))}
    </div>
  );
};
