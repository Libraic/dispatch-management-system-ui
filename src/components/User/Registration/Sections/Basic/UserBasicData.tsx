import { useContext } from "react";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import { TextualInputForm } from "../../../../Common/InputForm/public/TextualInputForm.tsx";
import {
  EMAIL_PLACEHOLDER,
  FIRST_NAME_PLACEHOLDER,
  LAST_NAME_PLACEHOLDER,
  NICKNAME_PLACEHOLDER,
} from "../../../../../constants/common/placeholder-constants.ts";
import { setRegistrationDataStringField } from "../../../../../utils/user/user-registration-utils.ts";
import { PasswordInputForm } from "../../../../Common/InputForm/public/PasswordInputForm.tsx";

export const UserBasicData = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, registrationDataError, setRegistrationData } =
    context;

  return (
    <>
      <>
        <div className="flex gap-5.5 mb-10">
          <TextualInputForm
            label="First Name"
            placeholder={FIRST_NAME_PLACEHOLDER}
            inputFieldValue={registrationData.firstName}
            isMandatory={true}
            errorMessage={registrationDataError.firstName}
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "firstName",
                value,
              )
            }
          />
          <TextualInputForm
            label="Nickname"
            placeholder={NICKNAME_PLACEHOLDER}
            inputFieldValue={registrationData.nickname}
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "nickname",
                value,
              )
            }
          />
          <TextualInputForm
            label="Last Name"
            placeholder={LAST_NAME_PLACEHOLDER}
            inputFieldValue={registrationData.lastName}
            isMandatory={true}
            errorMessage={registrationDataError.lastName}
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "lastName",
                value,
              )
            }
          />
        </div>
        <div className="flex gap-x-5.5 mb-10">
          <TextualInputForm
            label="E-mail"
            placeholder={EMAIL_PLACEHOLDER}
            inputFieldValue={registrationData.email}
            isMandatory={true}
            errorMessage={registrationDataError.email}
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "email",
                value,
              )
            }
          />
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
        </div>
        <div className="flex gap-x-5.5 mb-10">
          <PasswordInputForm
            label="Password"
            inputFieldValue={registrationData.password}
            isMandatory={true}
            errorMessage={registrationDataError.password}
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "password",
                value,
              )
            }
          />
          <PasswordInputForm
            label="Confirm Password"
            inputFieldValue={registrationData.confirmPassword}
            isMandatory={true}
            errorMessage=""
            saveInputData={(value: string) =>
              setRegistrationDataStringField(
                setRegistrationData,
                "confirmPassword",
                value,
              )
            }
          />
        </div>
      </>
    </>
  );
};
