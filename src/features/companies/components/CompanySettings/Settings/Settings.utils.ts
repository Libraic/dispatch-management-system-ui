import type { CompanySettings } from "#/features/companies/components/CompanySettings/Settings/Settings.types";
import { DEFAULT_TIMEZONE_DATA } from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings.constants";

export const getDefaultSettings = (): CompanySettings => ({
  timezone: DEFAULT_TIMEZONE_DATA,
});
