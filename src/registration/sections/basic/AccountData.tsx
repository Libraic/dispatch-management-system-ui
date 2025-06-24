import { SectionDivision } from "../SectionDivision.tsx";
import { InputForm } from "../../../global/InputForm.tsx";
import * as React from "react";
import { useContext, useEffect } from "react";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";
import { setRegistrationDataStringField } from "../../../utils/registration/user/user-registration.ts";
import {
  EMAIL_PLACEHOLDER,
  FIRST_NAME_PLACEHOLDER,
  LAST_NAME_PLACEHOLDER,
  NICKNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../../utils/constants/placeholders.ts";

export const AccountData: React.FC<{
  setShouldDisplayInformation: (value: boolean) => void;
}> = ({ setShouldDisplayInformation }) => {
  const [isAccountDataExpanded, setIsAccountDataExpanded] =
    React.useState(true);
  const context = useContext(RegistrationContext)!;

  const { registrationData, registrationDataError, setRegistrationData } =
    context;

  useEffect(() => {
    setShouldDisplayInformation(isAccountDataExpanded);
  }, [isAccountDataExpanded, setShouldDisplayInformation]);

  return (
    <>
      <SectionDivision
        division="Account Data"
        isExpanded={isAccountDataExpanded}
        setIsExpanded={setIsAccountDataExpanded}
      />
      {isAccountDataExpanded && (
        <>
          <div className="flex gap-5.5 mb-10">
            <InputForm
              label="First Name"
              placeholder={FIRST_NAME_PLACEHOLDER}
              type="text"
              name="first-name"
              inputFieldValue={registrationData.firstName}
              isMandatory={true}
              errorText={registrationDataError.firstName}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "firstName",
                  value,
                )
              }
            />
            <InputForm
              label="Nickname"
              placeholder={NICKNAME_PLACEHOLDER}
              type="text"
              name="nick-name"
              inputFieldValue={registrationData.nickname}
              isMandatory={false}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "nickname",
                  value,
                )
              }
            />
            <InputForm
              label="Last Name"
              placeholder={LAST_NAME_PLACEHOLDER}
              type="text"
              name="last-name"
              inputFieldValue={registrationData.lastName}
              isMandatory={true}
              errorText={registrationDataError.lastName}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "lastName",
                  value,
                )
              }
            />
          </div>
          <div className="flex gap-x-5.5 mb-10">
            <InputForm
              label="E-mail"
              placeholder={EMAIL_PLACEHOLDER}
              type="email"
              name="email"
              inputFieldValue={registrationData.email}
              isMandatory={true}
              errorText={registrationDataError.email}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "email",
                  value,
                )
              }
            />
            <InputForm
              label="Personal E-mail"
              placeholder={EMAIL_PLACEHOLDER}
              type="email"
              name="email"
              inputFieldValue={registrationData.personalEmail}
              isMandatory={false}
              errorText={registrationDataError.personalEmail}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "personalEmail",
                  value,
                )
              }
            />
          </div>
          <div className="flex gap-x-5.5 mb-10">
            <InputForm
              label="Password"
              placeholder={PASSWORD_PLACEHOLDER}
              type="password"
              name="password"
              inputFieldValue={registrationData.password}
              isMandatory={true}
              errorText={registrationDataError.password}
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "password",
                  value,
                )
              }
            />
            <InputForm
              label="Confirm Password"
              placeholder={PASSWORD_PLACEHOLDER}
              type="password"
              name="confirm-password"
              inputFieldValue={registrationData.confirmPassword}
              isMandatory={true}
              errorText=""
              saveData={(value: string) =>
                setRegistrationDataStringField(
                  setRegistrationData,
                  "confirmPassword",
                  value,
                )
              }
            />
          </div>
        </>
      )}
    </>
  );
};
