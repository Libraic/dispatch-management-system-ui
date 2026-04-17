import type { Period, Time } from "#/types/internal/planner/planner-types";

export const timeToHHmm = (time?: Time) => {
  if (!time) {
    return undefined;
  }

  let hour = parseInt(time.hour, 10);

  if (time.period === "AM") {
    if (hour === 12) {
      hour = 0;
    }
  } else {
    if (hour !== 12) {
      hour += 12;
    }
  }

  const hh = hour.toString().padStart(2, "0");
  const mm = time.minute.padStart(2, "0");

  return `${hh}:${mm}`;
};

export const hhmmToTime = (hhmm?: string): Time | undefined => {
  if (!hhmm) {
    return undefined;
  }
  const [hourStr, minuteStr] = hhmm.split(":");
  let hour = parseInt(hourStr, 10);

  const period: Period = hour < 12 ? "AM" : "PM";

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  return {
    hour: hour.toString(),
    minute: minuteStr,
    period,
  };
};
