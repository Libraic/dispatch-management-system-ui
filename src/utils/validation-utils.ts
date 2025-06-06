import { BLANK_STRING } from "./global-constants.ts";

export const validateEmail = (value: string, isMandatory: boolean): string => {
  if (value === BLANK_STRING) {
    return isMandatory ? "The e-mail is required" : BLANK_STRING;
  }

  const parts = value.split("@");
  if (parts.length !== 2) {
    return "The format of the e-mail is invalid";
  }

  const anotherPart = parts[1].split(".");
  if (anotherPart.length !== 2) {
    return "The domain of the e-mail is invalid";
  }

  return BLANK_STRING;
};

export const validatePassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (password === BLANK_STRING) {
    return "The password is required";
  }

  if (password.length < 8) {
    return "Must be at least 8 characters long";
  }

  if (password !== confirmPassword) {
    return "The passwords do not match";
  }

  return BLANK_STRING;
};
