import { useContext } from "react";
import { UserRegistrationContext } from "../../../../../../../context/UserRegistrationContext.ts";
import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { CONTACT_INFORMATION_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { EMAIL_PLACEHOLDER } from "../../../../../../../constants/common/placeholder-constants.ts";
import { InputForm } from "../../../../../../Common/InputForm/public/InputForm.tsx";
import { setRegistrationDataStringField } from "../../../../../../../utils/user/user-registration-utils.ts";
import { UserEmergencyContact } from "../../../../Sections/Contact/UserEmergencyContact.tsx";

export const UserContactSectionLayout = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, registrationDataError, setRegistrationData } =
    context;
  return (
    <>
      <PageHeader headerInfo={CONTACT_INFORMATION_HEADER} />
      <InputForm
        label="Personal E-mail"
        placeholder={EMAIL_PLACEHOLDER}
        type="email"
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
