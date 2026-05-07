import {
  DEFAULT_TIMEZONE_DATA,
  US_TIMEZONES,
} from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings.constants";
import { DEFAULT_LOCALE } from "#/constants/date/date-constants";
import type { Time } from "#/types/internal/planner/planner-types";
import { Temporal } from "@js-temporal/polyfill";

export const getTimezoneDataByValue = (value: string) => {
  for (const timezoneData of US_TIMEZONES) {
    if (timezoneData.value === value) {
      return timezoneData;
    }
  }

  return DEFAULT_TIMEZONE_DATA;
};

export const getTimezoneDataByLabel = (label: string) => {
  for (const timezoneData of US_TIMEZONES) {
    if (timezoneData.label === label) {
      return timezoneData;
    }
  }

  return DEFAULT_TIMEZONE_DATA;
};

export const getZonedDateParts = (
  timezone: string,
  date: Date = new Date(),
) => {
  const parts = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
};

export const getZonedIsoDate = (date: Date, timezone: string) => {
  const { year, month, day } = getZonedDateParts(timezone, date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const to24Hour = (time?: Time): number => {
  if (!time) return 0;
  const hour12 = Number(time.hour);
  if (time.period === "AM") {
    return hour12 === 12 ? 0 : hour12;
  }

  return hour12 === 12 ? 12 : hour12 + 12;
};

export const toZonedDateTime = (
  date: string,
  timezone: string,
  time?: Time,
) => {
  const [year, month, day] = date.split("-").map(Number);

  const hour = time ? to24Hour(time) : 0;
  const minute = time ? Number(time.minute) : 0;

  return Temporal.ZonedDateTime.from({
    timeZone: timezone,
    year,
    month,
    day,
    hour,
    minute,
  });
};

export const getDayProgress = (date: Date, timezone: string) => {
  const { hour, minute, second } = getZonedDateParts(timezone, date);

  return (hour * 3600 + minute * 60 + second) / 86400;
};
