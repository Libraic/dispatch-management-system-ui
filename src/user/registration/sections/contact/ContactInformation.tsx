import { PageHeader } from "../../../../global/PageHeader.tsx";
import { EmergencyContact } from "../basic/EmergencyContact.tsx";
import { InputForm } from "../../../../global/input-forms/InputForm.tsx";
import { EMAIL_PLACEHOLDER } from "../../../../utils/constants/placeholders.ts";
import { setRegistrationDataStringField } from "../../../../utils/registration/user/user-registration.ts";
import { useContext } from "react";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";

export const ContactInformation = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, registrationDataError, setRegistrationData } =
    context;
  return (
    <>
      <PageHeader
        header="Contact Information"
        subheader="The contact data of the employee"
      />
      <InputForm
        label="Personal E-mail"
        placeholder={EMAIL_PLACEHOLDER}
        type="email"
        name="email"
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
      <EmergencyContact />
    </>
  );
};
