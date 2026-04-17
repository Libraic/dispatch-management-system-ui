import { BLANK_STRING, ZERO } from "#/constants/common/global-constants";

export const divideNumbersAsStrings = (a: string, b: string): string => {
  if (a === BLANK_STRING || b === BLANK_STRING) {
    return "0";
  }

  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  return divide(num1, num2).toString();
};

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
