import { CompanyRegistrationInputForms } from "../internal/CompanyRegistrationInputForms.tsx";
import { CompanyStartAndServiceDateSelector } from "../internal/CompanyStartAndServiceDateSelector.tsx";

export const CompanyRegistrationForm = () => {
  return (
    <div className="flex flex-col justify-between h-3/4 m-">
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <CompanyRegistrationInputForms />
        <CompanyStartAndServiceDateSelector />
      </div>
    </div>
  );
};
