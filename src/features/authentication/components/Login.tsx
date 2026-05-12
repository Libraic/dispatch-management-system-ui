import { TextualInputField } from "#/ui/InputField/components/public/TextualInputField";
import { useContext, useState } from "react";
import type {
  LoginData,
  LoginError,
} from "#/features/authentication/components/Login.types";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { PasswordInputField } from "#/ui/InputField/components/public/PasswordInputField";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import {
  BACKGROUND_NORMAL_COLOR,
  BORDER_NORMAL_COLOR,
  HOVER_BACKGROUND_SOLID_COLOR,
  HOVER_BORDER_SOLID_COLOR,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import { ErrorContainer } from "#/ui/ErrorContainer/ErrorContainer";
import { authenticateUser } from "#/features/authentication/components/login.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import { handleApiError } from "#/shared/api/utils/api.utils";
import { useNavigate } from "react-router-dom";
import { HOME } from "#/shared/routes/routes";
import { validateLoginData } from "#/features/authentication/components/Login.validation";

export const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({});
  const [loginErrors, setLoginErrors] = useState<LoginError>({});
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const login = async () => {
    const errors = validateLoginData(loginData);
    setLoginErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    const response = await authenticateUser(loginData);
    if (!response.ok) {
      const error = response.error;
      handleApiError({
        error: error,
        setFieldErrors: setLoginErrors,
        showToast,
      });
      return;
    }

    navigate(HOME);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="font-black mb-[3rem] text-[1.35rem]">
        <p>Log into your account</p>
      </div>
      <div className="flex flex-col w-[15rem] gap-y-[2rem]">
        <TextualInputField
          label="Username"
          placeholder="username@domain.com"
          inputFieldValue={loginData.username || BLANK_STRING}
          saveInputData={(username: string) =>
            setLoginData((prev) => ({ ...prev, username }))
          }
          tailwindProperties={{
            minHeight: BLANK_STRING,
          }}
        />
        <PasswordInputField
          label="Password"
          inputFieldValue={loginData.password || BLANK_STRING}
          saveInputData={(password: string) =>
            setLoginData((prev) => ({ ...prev, password }))
          }
          tailwindProperties={{
            minHeight: BLANK_STRING,
          }}
        />
      </div>
      <div className="flex flex-col w-[15rem]">
        <ErrorContainer
          errorMessage={loginErrors.credentials || BLANK_STRING}
        />
      </div>
      <div className="flex flex-col w-[15rem] my-5">
        <SubmitButton
          actionText="Login"
          action={login}
          tailwindProperties={{
            borderColor: BORDER_NORMAL_COLOR,
            backgroundColor: BACKGROUND_NORMAL_COLOR,
            textColor: "text-white",
            hoverBackgroundColor: HOVER_BACKGROUND_SOLID_COLOR,
            hoverBorderColor: HOVER_BORDER_SOLID_COLOR,
          }}
        />
      </div>
    </div>
  );
};
