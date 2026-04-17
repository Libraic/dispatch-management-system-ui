import { BLANK_STRING } from "#/constants/common/global-constants";

export const sanitizeCurrency = (input: string) => {
  const commasOmittedInput = input.replace(/[,$\s]/g, BLANK_STRING);
  const regex = /^-?\d+(\.\d*)?$/;
  if (!regex.test(commasOmittedInput)) {
    return commasOmittedInput.substring(0, commasOmittedInput.length - 1);
  }

  return commasOmittedInput;
};
