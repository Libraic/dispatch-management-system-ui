import { ZERO } from "../../constants/common/global-constants.ts";

export const divide = (a: number, b: number, decimalPlaces?: number) => {
  if (b === 0) {
    return ZERO;
  }

  const places = decimalPlaces ?? 2;
  return (a / b).toFixed(places);
};
