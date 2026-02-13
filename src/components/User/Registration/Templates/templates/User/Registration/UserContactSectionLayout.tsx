import { useContext } from "react";
import { UserRegistrationContext } from "../../../../../../../context/UserRegistrationContext.ts";
import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { CONTACT_INFORMATION_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { EMAIL_PLACEHOLDER } from "../../../../../../../constants/common/placeholder-constants.ts";
import { TextualInputForm } from "../../../../../../Common/InputForm/public/TextualInputForm.tsx";
import { setRegistrationDataStringField } from "../../../../../../../utils/user/user-registration-utils.ts";
import { UserEmergencyContact } from "../../../../Sections/Contact/UserEmergencyContact.tsx";

export const UserContactSectionLayout = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, registrationDataError, setRegistrationData } =
    context;
  return (
    <>
      <PageHeader headerInfo={CONTACT_INFORMATION_HEADER} />
      <TextualInputForm
        label="Personal E-mail"
        placeholder={EMAIL_PLACEHOLDER}
        inputFieldValue={registrationData.personalEmail}
        errorMessage={registrationDataError.personalEmail}
        saveInputData={(value: string) =>
          setRegistrationDataStringField(
            setRegistrationData,
            "personalEmail",
            value,
          )
        }
      />
      <UserEmergencyContact />
    </>
  );
};
