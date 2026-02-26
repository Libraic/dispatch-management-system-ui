import {
  BLANK_SPACE,
  BLANK_STRING,
  CLOSE_BRACKET,
  HYPHEN,
  OPEN_BRACKET,
} from "../../constants/common/global-constants.ts";

export const getInputTagNameFromLabel = (label: string) =>
  label.toLowerCase().replace(" ", HYPHEN);

export const cleanPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[()\s-]/g, BLANK_STRING);
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const wasParenthesisRemoved =
    phoneNumber.indexOf(OPEN_BRACKET) === 0 &&
    phoneNumber.indexOf(CLOSE_BRACKET) < 0;
  const cleanedPhonedNumber = cleanPhoneNumber(phoneNumber);
  const sanitizedPhoneNumber = wasParenthesisRemoved
    ? cleanedPhonedNumber.slice(0, 2)
    : cleanedPhonedNumber;
  const len = sanitizedPhoneNumber.length;
  const firstPart =
    len < 3 ? sanitizedPhoneNumber : sanitizedPhoneNumber.slice(0, 3);
  const secondPart =
    len < 6
      ? sanitizedPhoneNumber.slice(3, len)
      : sanitizedPhoneNumber.slice(3, 6);
  const thirdPart =
    len < 10
      ? sanitizedPhoneNumber.slice(6, len)
      : sanitizedPhoneNumber.slice(6, sanitizedPhoneNumber.length);

  return `${len < 3 ? firstPart : OPEN_BRACKET + firstPart + CLOSE_BRACKET}${secondPart !== BLANK_STRING ? BLANK_SPACE + secondPart : BLANK_STRING}${thirdPart !== BLANK_STRING ? HYPHEN + thirdPart : BLANK_STRING}`;
};
