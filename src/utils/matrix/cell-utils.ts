import { CellType } from "../../types/matrix/matrix-types.ts";
import {
  BLANK_SPACE,
  BLANK_STRING,
  DOLLAR_SIGN,
  DOT,
} from "../constants/global-constants.ts";

export const formatNumericValue = (input: string) => {
  const parts = input.split(DOT);
  const decimalPart = parts.length > 1 ? DOT + parts[1] : BLANK_STRING;
  return Number(parts[0]).toLocaleString("en-US") + decimalPart;
};

export const sanitizeInput = (input: string | null, cellType?: CellType) => {
  if (!input) {
    return BLANK_STRING;
  }

  if (!cellType || cellType === CellType.ALPHANUMERIC) {
    return input;
  }

  if (input[0] === DOT) {
    return BLANK_STRING;
  }

  const parts = input.split(DOT);
  const removedDots =
    parts.length > 2
      ? parts[0] +
        DOT +
        parts.slice(1).join(BLANK_STRING).replace(/\./g, BLANK_STRING)
      : input;
  const sanitizedInput = removedDots.replace(/[^0-9.]/g, BLANK_STRING);
  const formattedInput = formatNumericValue(sanitizedInput);
  return cellType === CellType.CURRENCY
    ? DOLLAR_SIGN + BLANK_SPACE + formattedInput
    : formattedInput;
};
