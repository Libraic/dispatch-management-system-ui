import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { DispatcherRegistrationErrorData } from "#/types/internal/dispatcher/dispatcher-registration-types";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { DISPATCHER_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { getBlankDispatcherRegistrationData } from "#/utils/dispatcher/dispatcher-registration-utils";
import { saveDispatcher } from "#/features/dispatchers/api/dispatchers.api";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import { DispatcherRegistrationForm } from "#/features/dispatchers/components/DispatcherRegistrationForm";
import { validateDispatcherRegistrationData } from "#/features/dispatchers/components/DispatcherRegistrationForm.validator";
import { DASHBOARD } from "#/shared/routes/routes";

export const DispatcherRegistrationPage = () => {
  const [dispatcherRegistrationData, setDispatcherRegistrationData] = useState(
    getBlankDispatcherRegistrationData(),
  );

  const [dispatcherRegistrationErrorData, setDispatcherRegistrationErrorData] =
    useState<DispatcherRegistrationErrorData>({});

  const companyUuid = useParams().companyUuid!!;
  const navigate = useNavigate();
  const baseRoute = `/${companyUuid}${DASHBOARD}`;
  const { showToast } = useContext(ToastContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateDispatcherRegistrationData(
      dispatcherRegistrationData,
    );
    if (Object.keys(errors).length !== 0) {
      setDispatcherRegistrationErrorData(errors);
      return;
    }

    const response = await saveDispatcher(
      dispatcherRegistrationData,
      companyUuid,
    );
    if (!response.ok) {
      showToast(response.error.message);
      return;
    }

    navigate(baseRoute);
  };

  return (
    <div className="flex flex-col h-screen w-screen gap-y-[15rem]">
      <PageHeader headerInfo={DISPATCHER_REGISTRATION_HEADER} />
      <DispatcherRegistrationForm
        dispatcherRegistrationData={dispatcherRegistrationData}
        dispatcherRegistrationErrorData={dispatcherRegistrationErrorData}
        setDispatcherRegistrationData={setDispatcherRegistrationData}
      />
      <div className="flex flex-row items-center justify-center w-screen mb-15 gap-x-10">
        <SubmitButton actionText="Submit" action={handleSubmit} />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
    </div>
  );
};
