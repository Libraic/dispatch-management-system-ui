import { CompanyRegistrationInputForms } from "../../../molecules/Company/Registration/CompanyRegistrationInputForms.tsx";
import { CompanyStartAndServiceDateSelector } from "../../../molecules/Company/Registration/CompanyStartAndServiceDateSelector.tsx";

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
