import { ZERO } from "#/constants/common/global-constants";

export const divideNumbersAsStrings = (a?: string, b?: string): string => {
  if (!a || !b) {
    return "0";
  }

  const num1 = a ? parseFloat(a) : 0;
  const num2 = b ? parseFloat(b) : 0;
  if (num2 === 0) {
    return "0";
  }

  return divide(num1, num2).toString();
};

export const addNumbersAsStrings = (a?: string, b?: string): string => {
  const num1 = a ? parseFloat(a) : 0;
  const num2 = b ? parseFloat(b) : 0;
  return (num1 + num2).toString();
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
