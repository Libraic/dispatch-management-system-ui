import { HYPHEN } from "#/constants/common/global-constants";

export const getInputTagNameFromLabel = (label: string) =>
  label.toLowerCase().replace(" ", HYPHEN);
