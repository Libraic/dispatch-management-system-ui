import { CompanyRegistrationInputForms } from "#/components/Company/Registration/internal/CompanyRegistrationInputForms";
import { CompanyStartAndServiceDateSelector } from "#/components/Company/Registration/internal/CompanyStartAndServiceDateSelector";

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
