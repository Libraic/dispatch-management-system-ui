import { useContext, useEffect, useState } from "react";
import { getDefaultSettings } from "#/features/companies/components/CompanySettings/Settings/Settings.utils";
import { TimezoneSettings } from "#/features/companies/components/CompanySettings/TimezoneSettings/TimezoneSettings";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { useNavigate, useParams } from "react-router-dom";
import { DASHBOARD } from "#/shared/routes/routes";
import {
  changeSettings,
  getSettings,
} from "#/features/companies/api/companies.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import {
  getTimezoneDataByLabel,
  getTimezoneDataByValue,
} from "#/shared/utils/timezone.utils";

export const Settings = () => {
  const [settings, setSettings] = useState(getDefaultSettings());
  const navigate = useNavigate();
  const { companyUuid } = useParams();
  const baseRoute = `/${companyUuid}${DASHBOARD}`;
  const { showToast } = useContext(ToastContext);

  const updateSettings = async () => {
    const response = await changeSettings(companyUuid!!, settings);
    if (!response.ok) {
      showToast(response.error.message);
      return;
    }
    navigate(baseRoute);
  };

  useEffect(() => {
    getSettings(companyUuid!!).then((response) => {
      if (response.ok) {
        setSettings({
          timezone: getTimezoneDataByValue(response.data.timezone),
        });
      } else {
        setSettings(getDefaultSettings());
      }
    });
  }, [companyUuid]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-[10rem]">
        <TimezoneSettings
          timezoneLabel={settings.timezone.label}
          setTimezone={(timezoneLabel: string) =>
            setSettings({
              ...settings,
              timezone: getTimezoneDataByLabel(timezoneLabel),
            })
          }
        />
        <div className="flex flex-row items-center justify-center mb-[1.3rem] gap-x-10">
          <SubmitButton actionText="Apply" action={updateSettings} />
          <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
        </div>
      </div>
    </div>
  );
};
