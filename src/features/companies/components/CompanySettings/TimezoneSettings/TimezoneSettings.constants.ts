export const DEFAULT_TIMEZONE_DATA = {
  label: "Eastern Time (ET)",
  value: "America/New_York",
};

export interface TimezoneData {
  label: string;
  value: string;
}

export const US_TIMEZONES: TimezoneData[] = [
  DEFAULT_TIMEZONE_DATA,
  { label: "Central Time (CT)", value: "America/Chicago" },
  { label: "Mountain Time (MT)", value: "America/Denver" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Alaska Time (AKT)", value: "America/Anchorage" },
  { label: "Hawaii Time (HST)", value: "Pacific/Honolulu" },
];

export const US_TIMEZONE_LABELS = US_TIMEZONES.map((tz) => tz.label);
