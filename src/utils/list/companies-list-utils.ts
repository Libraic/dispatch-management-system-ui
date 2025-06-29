import { BLANK_STRING } from "../constants/global.ts";

export const getNameInitials = (name: string) => {
  if (name === BLANK_STRING) {
    return BLANK_STRING;
  }

  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
};

export const getPropertySafe = (property: string | null) => {
  return property ? property : "N/A";
};

export const getSpentDays = (referenceDate: string) => {
  const targetDate = new Date(referenceDate);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInMs = today.getTime() - targetDate.getTime();

  const diffInDays = Math.round(diffInMs / msPerDay);
  if (diffInDays <= 0) {
    return "today";
  }

  const years = Math.floor(diffInDays / 365);
  const months = Math.floor((diffInDays - years * 365) / 30);
  const days = diffInDays - 365 * years - 30 * months;

  return `${years > 0 ? `${years}y ` : ""}${months > 0 ? `${months}m ` : ""}${days > 0 ? `${days}d` : ""}`;
};
