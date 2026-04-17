import { CompanyRegistrationBasicDataForm } from "./CompanyRegistrationBasicDataForm";
import { CompanyRegistrationAuthDataForm } from "./CompanyRegistrationAuthDataForm";

export const CompanyRegistrationInputForms = () => {
  return (
    <div>
      <CompanyRegistrationBasicDataForm />
      <CompanyRegistrationAuthDataForm />
    </div>
  );
};
