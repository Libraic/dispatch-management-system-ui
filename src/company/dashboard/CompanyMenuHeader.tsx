import * as React from "react";
import { getNameInitials } from "../../utils/list/companies-list-utils.ts";

export const CompanyMenuHeader: React.FC<{ companyName: string }> = ({
  companyName,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-x-2">
      <div className="bg-white w-7 h-7 rounded-[0.3rem] flex items-center justify-center px-4">
        <p className="font-open-sans text-[1.2rem]">
          {getNameInitials(companyName)}
        </p>
      </div>
      <p className="font-open-sans font-medium text-white text-standard-size">
        D A S H B O A R D
      </p>
    </div>
  );
};
