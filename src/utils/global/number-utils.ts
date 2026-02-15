import {
  BLANK_STRING,
  DOLLAR_SIGN,
  DOT,
  ZERO,
} from "../../constants/common/global-constants.ts";
import { DEFAULT_LOCALE } from "../../constants/date/date-constants.ts";

export const divide = (
  a: number,
  b: number,
  decimalPlaces?: number,
): number => {
  if (b === 0) {
    return ZERO;
  }

  const places = decimalPlaces ?? 2;
  return parseFloat((a / b).toFixed(places));
};

export const formatCurrency = (number: number) => {
  return `${DOLLAR_SIGN} ${formatNumber(number)}`;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat(DEFAULT_LOCALE).format(number);
};

export const formatStringNumber = (number: string) => {
  if (number === BLANK_STRING) {
    return BLANK_STRING;
  }

  const parts = number.split(DOT);
  const formattedNumber = new Intl.NumberFormat(DEFAULT_LOCALE).format(
    parseFloat(parts[0]),
  );
  const decimalPart = parts.length > 1 ? DOT + parts[1] : BLANK_STRING;
  return `${formattedNumber}${decimalPart}`;
};

export const removeTrailingDotIfNecessary = (input: string) => {
  if (input.endsWith(DOT)) {
    return input.substring(0, input.length - 1);
  }

  return input;
};
