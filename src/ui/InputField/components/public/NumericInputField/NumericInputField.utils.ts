import { BLANK_STRING } from "#/constants/common/global-constants";

export const sanitizeNumber = (input: string) => {
  const commasOmittedInput = input.replace(/,/g, BLANK_STRING);
  const regex = /^-?\d+(\.\d*)?$/;
  if (!regex.test(commasOmittedInput)) {
    return commasOmittedInput.substring(0, commasOmittedInput.length - 1);
  }

  return commasOmittedInput;
};
