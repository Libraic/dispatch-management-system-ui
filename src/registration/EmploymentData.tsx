import { SectionDivision } from "./SectionDivision.tsx";
import { YearForm } from "./YearForm.tsx";
import * as React from "react";

export const EmploymentData = () => {
  const [isEmploymentDataExpanded, setIsEmploymentDataExpanded] =
    React.useState(true);

  return (
    <>
      <SectionDivision
        division="Employment Data"
        isExpanded={isEmploymentDataExpanded}
        setIsExpanded={setIsEmploymentDataExpanded}
      />
      {isEmploymentDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <YearForm endingYear={2025} />
        </div>
      )}
    </>
  );
};
