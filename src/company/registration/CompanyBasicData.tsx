import { InputForm } from "../../global/InputForm.tsx";
import { alterCompanySimpleField } from "../../utils/registration/company/company-registration-utils.ts";
import { BLANK_STRING } from "../../utils/constants/global.ts";
import * as React from "react";
import type {
  CompanyRegistrationData,
  CompanyRegistrationError,
} from "../../types/registration/company/company-registration-data.ts";

export const CompanyBasicData: React.FC<{
  companyRegistrationData: CompanyRegistrationData;
  companyRegistrationErrors: CompanyRegistrationError;
  setCompanyRegistrationData: React.Dispatch<
    React.SetStateAction<CompanyRegistrationData>
  >;
}> = ({
  companyRegistrationData,
  companyRegistrationErrors,
  setCompanyRegistrationData,
}) => {
  return (
    <div className="flex flex-row gap-5.5 mb-10">
      <InputForm
        label="Name"
        placeholder="Alpha Expedition"
        type="text"
        name="name"
        inputFieldValue={companyRegistrationData.name}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.name}
        saveInputData={(companyName: string) =>
          alterCompanySimpleField(
            setCompanyRegistrationData,
            "name",
            companyName,
          )
        }
      />
      <InputForm
        label="MC Number"
        placeholder="MC#02854"
        type="text"
        name="mc-number"
        inputFieldValue={companyRegistrationData?.mcNumber ?? BLANK_STRING}
        isMandatory={false}
        saveInputData={(mcNumber: string) =>
          alterCompanySimpleField(
            setCompanyRegistrationData,
            "mcNumber",
            mcNumber,
          )
        }
      />
      <InputForm
        label="Address"
        placeholder="601 Shiloh Rd"
        type="text"
        name="address"
        inputFieldValue={companyRegistrationData?.address ?? BLANK_STRING}
        isMandatory={false}
        saveInputData={(address: string) =>
          alterCompanySimpleField(
            setCompanyRegistrationData,
            "address",
            address,
          )
        }
      />
    </div>
  );
};
