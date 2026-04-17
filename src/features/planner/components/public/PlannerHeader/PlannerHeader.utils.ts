import { BLANK_SPACE, HYPHEN } from "#/constants/common/global-constants";

export const isoDaysToPlannerHeaderDays = (days: string[]) =>
  days.map((day) => {
    const dayTokens = day.split(BLANK_SPACE);
    const dateTokens = dayTokens[1].split(HYPHEN);
    return `${dayTokens[0]} ${dateTokens[1]}.${dateTokens[2]}`;
  });
