import { useContext } from "react";
import { UserRegistrationContext } from "../../../../../context/UserRegistrationContext.ts";
import { InputForm } from "../../../../Common/InputForm/public/InputForm.tsx";
import {
  EMAIL_PLACEHOLDER,
  FIRST_NAME_PLACEHOLDER,
  LAST_NAME_PLACEHOLDER,
  NICKNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../../../../constants/common/placeholder-constants.ts";
import { setRegistrationDataStringField } from "../../../../../utils/user/user-registration-utils.ts";

export const UserBasicData = () => {
  const context = useContext(UserRegistrationContext)!;
  const { registrationData, registrationDataError, setRegistrationData } =
    context;

  return (
    <>
      <>
        <div className="flex gap-5.5 mb-10">
          <InputForm
            label="First Name"
            placeholder={FIRST_NAME_PLACEHOLDER}
            type="text"
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
          <InputForm
            label="Nickname"
            placeholder={NICKNAME_PLACEHOLDER}
            type="text"
            inputFieldValue={registrationData.nickname}
            saveInputData={(value: string) =>
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
          <InputForm
            label="E-mail"
            placeholder={EMAIL_PLACEHOLDER}
            type="email"
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
        </div>
        <div className="flex gap-x-5.5 mb-10">
          <InputForm
            label="Password"
            placeholder={PASSWORD_PLACEHOLDER}
            type="password"
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
          <InputForm
            label="Confirm Password"
            placeholder={PASSWORD_PLACEHOLDER}
            type="password"
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
