import { SectionDivision } from "./SectionDivision.tsx";
import { YearForm } from "./YearForm.tsx";
import * as React from "react";

export const BirthData = () => {
  const [isBirthDataExpanded, setIsBirthDataExpanded] = React.useState(true);

  return (
    <>
      <SectionDivision
        division="Birth Data"
        isExpanded={isBirthDataExpanded}
        setIsExpanded={setIsBirthDataExpanded}
      />
      {isBirthDataExpanded && (
        <div className="flex gap-x-11 mb-5">
          <YearForm endingYear={2007} />
        </div>
      )}
    </>
  );
};
