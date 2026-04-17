import { BLANK_STRING, DOT } from "#/constants/common/global-constants";
import { DEFAULT_LOCALE } from "#/constants/date/date-constants";

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
