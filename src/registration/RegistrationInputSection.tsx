import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { SubmitButton } from "../button/SubmitButton.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  getBlankUserRegistrationData,
  handleUserCreation,
} from "../utils/registration/user/user-registration.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import {
  RegistrationContext,
  type RegistrationContextData,
} from "../context/RegistrationContext.ts";
import { Toast } from "../toast/Toast.tsx";
import { BLANK_STRING } from "../utils/constants/global.ts";
import {
  type SectionData,
  SectionEnum,
} from "../types/registration/user/section.ts";
import type {
  RegistrationDataError,
  UserRegistrationData,
} from "../types/registration/user/user-registration-data.ts";
import {
  getBlankRegistrationDataError,
  getRegistrationDataErrors,
  getSectionsWithErrors,
} from "../utils/registration/user/user-registration-errors.ts";
import { useNavigate } from "react-router-dom";
import { HOME } from "../utils/routes/routes.ts";
import { useToast } from "../hooks/useToast.ts";

export const RegistrationInputSection: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] =
    useState<UserRegistrationData>(getBlankUserRegistrationData());

  const [registrationDataError, setRegistrationDataError] =
    useState<RegistrationDataError>(getBlankRegistrationDataError());

  const navigate = useNavigate();

  const [submitButtonText, setSubmitButtonText] = useState<string>("Continue");
  const toastData = useToast();

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
  }, [activeSection, setSubmitButtonText, sectionsHandler]);

  useEffect(() => {
    if (sectionsHandler.areAllSectionsComplete()) {
      handleUserCreation(
        registrationData,
        setRegistrationDataError,
        toastData,
        sectionsHandler,
      ).then((res) => {
        if (res) {
          navigate(HOME);
        }
      });
    }
  }, [navigate, registrationData, sectionsHandler, toastData]);

  const validateRegistrationData = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = getRegistrationDataErrors(registrationData);
    setRegistrationDataError(errors);
    const sectionsErrorsPriorSubmitting = getSectionsWithErrors(errors);
    sectionsHandler.setErrors(sectionsErrorsPriorSubmitting);
    if (sectionsErrorsPriorSubmitting.length === 0) {
      sectionsHandler.next();
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
      {toastData.getMessage() !== BLANK_STRING && (
        <Toast
          key={toastData.getIdentifier()}
          message={toastData.getMessage()}
          type={toastData.getOperationResult()}
        />
      )}
    </div>
  );
};
