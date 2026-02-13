import { TextualInputForm } from "../../../Common/InputForm/public/TextualInputForm.tsx";
import { setCompanyStringField } from "../../../../utils/company/company-registration-utils.ts";
import { BLANK_STRING } from "../../../../constants/common/global-constants.ts";
import { useContext } from "react";
import { CompanyRegistrationContext } from "../../../../context/CompanyRegistrationContext.ts";

export const CompanyRegistrationBasicDataForm = () => {
  const context = useContext(CompanyRegistrationContext)!;
  const companyRegistrationData = context.registrationData;
  const companyRegistrationErrors = context.registrationDataError;
  const setCompanyRegistrationData = context.setRegistrationData;
  return (
    <div className="flex flex-row gap-5.5 mb-10">
      <TextualInputForm
        label="Name"
        placeholder="Alpha Expedition"
        inputFieldValue={companyRegistrationData.name}
        isMandatory={true}
        errorMessage={companyRegistrationErrors.name}
        saveInputData={(companyName: string) =>
          setCompanyStringField(setCompanyRegistrationData, "name", companyName)
        }
      />
      <TextualInputForm
        label="MC Number"
        placeholder="MC#02854"
        inputFieldValue={companyRegistrationData?.mcNumber ?? BLANK_STRING}
        saveInputData={(mcNumber: string) =>
          setCompanyStringField(
            setCompanyRegistrationData,
            "mcNumber",
            mcNumber,
          )
        }
      />
      <TextualInputForm
        label="Address"
        placeholder="601 Shiloh Rd"
        inputFieldValue={companyRegistrationData?.address ?? BLANK_STRING}
        saveInputData={(address: string) =>
          setCompanyStringField(setCompanyRegistrationData, "address", address)
        }
      />
    </div>
  );
};
