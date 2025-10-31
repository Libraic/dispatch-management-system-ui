import * as React from "react";
import { BLANK_STRING } from "../../constants/common/global-constants.ts";

export const setObjectStringField = <T>(
  setData: React.Dispatch<React.SetStateAction<T>>,
  field: keyof T,
  value: string,
) => {
  setData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

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

export const validateMandatoryField = (value: string, fieldName: string) => {
  return value === BLANK_STRING ? `The ${fieldName} is required.` : "";
};

export const validatePassword = (password: string, confirmPassword: string) => {
  const passwordMandatoryFieldValidation = validateMandatoryField(
    password,
    "password",
  );
  if (passwordMandatoryFieldValidation !== BLANK_STRING) {
    return passwordMandatoryFieldValidation;
  }

  if (password !== confirmPassword) {
    return "The passwords do not match";
  }

  if (password.length < 8) {
    return "The password has less than 8 characters";
  }

  return BLANK_STRING;
};
