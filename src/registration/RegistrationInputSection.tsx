import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { SubmitButton } from "../button/SubmitButton.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  getBlankUserRegistrationData,
  getCreateUserRequestFromRegistrationData,
} from "../utils/registration/user/user-registration.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import {
  RegistrationContext,
  type RegistrationContextData,
} from "../context/RegistrationContext.ts";
import { Toast } from "../toast/Toast.tsx";
import type { CreateUserRequest } from "../types/api/registration-api.ts";
import { saveUser } from "../service/user-service.ts";
import { BLANK_STRING } from "../utils/constants/global.ts";
import {
  type SectionData,
  SectionEnum,
} from "../types/registration/user/section.ts";
import type {
  RegistrationDataError,
  UserRegistrationData,
} from "../types/registration/user/user-registration-data.ts";
import { ToastTypeEnum } from "../types/toast.ts";
import type { GroupErrorResponse } from "../types/api/common.ts";
import {
  actualizeRegistrationDataErrorFromApiResponse,
  getBlankRegistrationDataError,
  getRegistrationDataErrors,
  getSectionsWithErrors,
} from "../utils/registration/user/user-registration-errors.ts";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utils/routes/routes.ts";
import { getItemsErrors } from "../utils/api/api-errors-handler.ts";

export const RegistrationInputSection: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] =
    useState<UserRegistrationData>(getBlankUserRegistrationData());

  const [registrationDataError, setRegistrationDataError] =
    useState<RegistrationDataError>(getBlankRegistrationDataError());

  const navigate = useNavigate();

  const [submitButtonText, setSubmitButtonText] = useState<string>("Continue");
  const [errorMessage, setErrorMessage] = useState<string>(BLANK_STRING);
  const [toastId, setToastId] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastTypeEnum>(
    ToastTypeEnum.ERROR,
  );

  const activeSection = sectionsHandler.getActiveSection();
  const registrationContextData: RegistrationContextData = {
    registrationData: registrationData,
    setRegistrationData: setRegistrationData,
    registrationDataError: registrationDataError,
  };
  const sectionComponents: Record<SectionEnum, React.ReactNode> = {
    BASIC_INFORMATION: <BasicInformation />,
    EMPLOYMENT_INFORMATION: <EmploymentInformation />,
    WORKLOAD: <Workload />,
    NOTES: <Notes />,
  };

  useEffect(() => {
    if (sectionsHandler.isSectionFocused(SectionEnum.NOTES)) {
      setSubmitButtonText("Submit");
    } else {
      setSubmitButtonText("Continue");
    }
  }, [activeSection, setSubmitButtonText, setErrorMessage, sectionsHandler]);

  async function handleUserCreation() {
    const createUserRequest: CreateUserRequest =
      getCreateUserRequestFromRegistrationData(registrationData);
    const apiResponse = await saveUser(createUserRequest);
    if (apiResponse === undefined) {
      setErrorMessage("The server is not responding. Please try again later.");
      setToastId(Date.now().toString());
      setToastType(ToastTypeEnum.ERROR);
      return;
    }

    if (apiResponse.error !== null) {
      const errors = apiResponse.error as GroupErrorResponse[];
      for (const groupErrorResponse of errors) {
        const itemsErrors = getItemsErrors(groupErrorResponse);
        setRegistrationDataError((prev) => {
          const updated = actualizeRegistrationDataErrorFromApiResponse(
            prev,
            groupErrorResponse,
            itemsErrors,
          );
          const sectionsErrors = getSectionsWithErrors(updated);
          sectionsHandler.setErrors(sectionsErrors);
          return updated;
        });
      }
    }
  }

  const validateRegistrationData = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = getRegistrationDataErrors(registrationData);
    setRegistrationDataError(errors);
    const sectionsErrorsPriorSubmitting = getSectionsWithErrors(errors);
    sectionsHandler.setErrors(sectionsErrorsPriorSubmitting);
    if (sectionsErrorsPriorSubmitting.length === 0) {
      sectionsHandler.next();
    }

    if (sectionsHandler.areAllSectionsComplete()) {
      handleUserCreation().then(() => {});
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-between gap-y-5 bg-white overflow-y-auto">
      <div className="flex-1 gap-y-5 py-4 pb-3 px-7 overflow-auto">
        <RegistrationContext value={registrationContextData}>
          {sectionComponents[activeSection]}
        </RegistrationContext>
      </div>
      <div className="flex gap-x-3 mx-5 my-5">
        <CancelButton actionText="Cancel" action={() => navigate(HOME)} />
        <SubmitButton
          actionText={submitButtonText}
          action={validateRegistrationData}
        />
      </div>
      {errorMessage !== BLANK_STRING && (
        <Toast key={toastId} message={errorMessage} type={toastType} />
      )}
    </div>
  );
};
