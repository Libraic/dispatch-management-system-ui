import { TextualInputField } from "../../../Common/InputForm/public/TextualInputField.tsx";
import { COMPANY_EMAIL_PLACEHOLDER } from "../../../../constants/common/placeholder-constants.ts";
import { setCompanyStringField } from "../../../../utils/company/company-registration-utils.ts";
import { useContext } from "react";
import { CompanyRegistrationContext } from "../../../../context/CompanyRegistrationContext.ts";
import { PasswordInputField } from "../../../Common/InputForm/public/PasswordInputField.tsx";

export const CompanyRegistrationAuthDataForm = () => {
  const context = useContext(CompanyRegistrationContext)!;
  const companyRegistrationData = context.registrationData;
  const companyRegistrationErrors = context.registrationDataError;
  const setCompanyRegistrationData = context.setRegistrationData;

  return (
    <div className="flex flex-row gap-5.5 mb-10">
      <TextualInputField
        label="E-mail"
        placeholder={COMPANY_EMAIL_PLACEHOLDER}
        inputFieldValue={companyRegistrationData.email}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.email}
        saveInputData={(value: string) =>
          setCompanyStringField(setCompanyRegistrationData, "email", value)
        }
      />
      <PasswordInputField
        label="Password"
        inputFieldValue={companyRegistrationData.password}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.password}
        saveInputData={(value: string) =>
          setCompanyStringField(setCompanyRegistrationData, "password", value)
        }
      />
      <PasswordInputField
        label="Confirm Password"
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
