import { InputForm } from "../../../Common/InputForm/public/InputForm.tsx";
import {
  COMPANY_EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../../../constants/common/placeholder-constants.ts";
import { setCompanyStringField } from "../../../../utils/company/company-registration-utils.ts";
import { useContext } from "react";
import { CompanyRegistrationContext } from "../../../../context/CompanyRegistrationContext.ts";

export const CompanyRegistrationAuthDataForm = () => {
  const context = useContext(CompanyRegistrationContext)!;
  const companyRegistrationData = context.registrationData;
  const companyRegistrationErrors = context.registrationDataError;
  const setCompanyRegistrationData = context.setRegistrationData;

  return (
    <div className="flex flex-row gap-5.5 mb-10">
      <InputForm
        label="E-mail"
        placeholder={COMPANY_EMAIL_PLACEHOLDER}
        type="email"
        inputFieldValue={companyRegistrationData.email}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.email}
        saveInputData={(value: string) =>
          setCompanyStringField(setCompanyRegistrationData, "email", value)
        }
      />
      <InputForm
        label="Password"
        placeholder={PASSWORD_PLACEHOLDER}
        type="password"
        inputFieldValue={companyRegistrationData.password}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.password}
        saveInputData={(value: string) =>
          setCompanyStringField(setCompanyRegistrationData, "password", value)
        }
      />
      <InputForm
        label="Confirm Password"
        placeholder={PASSWORD_PLACEHOLDER}
        type="password"
        inputFieldValue={companyRegistrationData.confirmPassword}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.confirmPassword}
        saveInputData={(value: string) =>
          setCompanyStringField(
            setCompanyRegistrationData,
            "confirmPassword",
            value,
          )
        }
      />
    </div>
  );
};
