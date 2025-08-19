import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../../button/CancelButton.tsx";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import * as React from "react";
import { useState } from "react";
import {
  getBlankUserRegistrationData,
  getCreateUserRequestFromRegistrationData,
} from "../../utils/registration/user/user-registration.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import { Toast } from "../../toast/Toast.tsx";
import {
  BLANK_STRING,
  SUBMIT_BUTTON_TEXT,
} from "../../utils/constants/global.ts";
import {
  type UserRegistrationData,
  type UserRegistrationErrors,
} from "../../types/registration/user/user-registration-data.ts";
import {
  getBlankUserRegistrationErrors,
  getRegistrationDataErrors,
  getSectionsWithErrors,
} from "../../utils/registration/user/user-registration-errors.ts";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../utils/routes/routes.ts";
import { useToast } from "../../hooks/useToast.ts";
import type { RegistrationContextData } from "../../types/context/context-types.ts";
import { UserRegistrationContext } from "../../context/UserRegistrationContext.ts";
import type { CreateUserRequest } from "../../types/api/registration-api.ts";
import { saveUser } from "../../service/user-service.ts";
import { handleErrors } from "../../utils/registration/common-api-error-utils.ts";
import type { SectionsHandler } from "../../hooks/useSections.ts";
import { ContactInformation } from "./sections/contact/ContactInformation.tsx";

const sectionComponents: Record<string, React.ReactNode> = {
  BASIC_INFORMATION: <BasicInformation />,
  CONTACT_INFORMATION: <ContactInformation />,
  EMPLOYMENT_INFORMATION: <EmploymentInformation />,
  WORKLOAD: <Workload />,
  NOTES: <Notes />,
};

export const UserRegistrationInputArea: React.FC<{
  sectionsHandler: SectionsHandler;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] =
    useState<UserRegistrationData>(getBlankUserRegistrationData());

  const [registrationDataError, setRegistrationDataError] =
    useState<UserRegistrationErrors>(getBlankUserRegistrationErrors());

  const navigate = useNavigate();

  const toastData = useToast();
  const registrationContextData: RegistrationContextData<
    UserRegistrationData,
    UserRegistrationErrors
  > = {
    registrationData,
    setRegistrationData,
    registrationDataError,
  };

  const handleErrorsPriorSubmission = () => {
    const errors = getRegistrationDataErrors(registrationData);
    setRegistrationDataError(errors);
    const sectionsErrorsPriorSubmitting = getSectionsWithErrors(errors);
    sectionsHandler.setErrors(sectionsErrorsPriorSubmitting);
    return sectionsErrorsPriorSubmitting;
  };

  const handleErrorsAfterSubmission = async () => {
    const createUserRequest: CreateUserRequest =
      getCreateUserRequestFromRegistrationData(registrationData);
    const apiResponse = await saveUser(createUserRequest);
    const apiErrors = handleErrors(
      apiResponse,
      getBlankUserRegistrationErrors,
      (key) => key === "workloads" || key === "notes",
    );

    if (apiErrors == null) {
      navigate(HOME);
    } else if ("message" in apiErrors) {
      toastData.withErrorMessage(apiErrors.message);
    } else {
      setRegistrationDataError(apiErrors as UserRegistrationErrors);
      const erroneousSections = getSectionsWithErrors(apiErrors);
      sectionsHandler.setErrors(erroneousSections);
    }
  };

  const validateRegistrationData = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = handleErrorsPriorSubmission();
    if (!Array.from(errors.values()).some((v) => v)) {
      await handleErrorsAfterSubmission();
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-between gap-y-5 bg-white overflow-y-auto">
      <div className="flex-1 gap-y-5 py-4 pb-3 px-7 overflow-auto">
        <UserRegistrationContext value={registrationContextData}>
          {sectionComponents[sectionsHandler.getActiveSection()]}
        </UserRegistrationContext>
      </div>
      <div className="flex gap-x-3 mx-5 my-5">
        <CancelButton actionText="Cancel" action={() => navigate(HOME)} />
        <SubmitButton
          actionText={SUBMIT_BUTTON_TEXT}
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
