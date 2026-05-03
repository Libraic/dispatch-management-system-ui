import type {
  LoginData,
  LoginError,
} from "#/features/authentication/components/Login.types";

export const validateLoginData = (loginData: LoginData) => {
  const errors: LoginError = {};
  if (
    !loginData.username ||
    loginData.username.length === 0 ||
    !loginData.password ||
    loginData.password.length === 0
  ) {
    errors.credentials = "The provided credentials are not valid";
  }

  return errors;
};
