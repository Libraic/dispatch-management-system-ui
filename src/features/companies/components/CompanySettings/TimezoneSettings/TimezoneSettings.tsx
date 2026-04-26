import { SelectorField } from "#/ui/Selectors/SelectorField";
import React from "react";
import { US_TIMEZONE_LABELS } from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings.constants";

type TimezoneSettingsProps = {
  timezoneLabel: string;
  setTimezone: (timezone: string) => void;
};

export const TimezoneSettings: React.FC<TimezoneSettingsProps> = ({
  timezoneLabel,
  setTimezone,
}) => {
  return (
    <div>
      <SelectorField
        initialValue={timezoneLabel}
        data={US_TIMEZONE_LABELS}
        setElement={(timezone: string) => setTimezone(timezone)}
        label="Timezone"
        tailwindProperties={{
          maxWeight: "w-[12rem]",
        }}
      />
    </div>
  );
};
