import { HYPHEN } from "../../constants/common/global-constants.ts";

export const getInputTagNameFromLabel = (label: string) =>
  label.toLowerCase().replace(" ", HYPHEN);
