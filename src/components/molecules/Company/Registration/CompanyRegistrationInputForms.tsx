import { CompanyRegistrationBasicDataForm } from "./CompanyRegistrationBasicDataForm.tsx";
import { CompanyRegistrationAuthDataForm } from "./CompanyRegistrationAuthDataForm.tsx";

export const CompanyRegistrationInputForms = () => {
  return (
    <div>
      <CompanyRegistrationBasicDataForm />
      <CompanyRegistrationAuthDataForm />
    </div>
  );
};
