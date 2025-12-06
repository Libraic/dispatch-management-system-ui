import { CancelButton } from "../../Common/Button/CancelButton.tsx";
import { SubmitButton } from "../../Common/Button/SubmitButton.tsx";
import * as React from "react";
import { useState } from "react";
import {
  getBlankUserRegistrationData,
  getCreateUserRequestFromRegistrationData,
} from "../../../utils/user/user-registration-utils.ts";
import { Toast } from "../../Common/Toast/Toast.tsx";
import {
  BLANK_STRING,
  SUBMIT_BUTTON_TEXT,
} from "../../../constants/common/global-constants.ts";
import { type UserRegistrationData } from "../../../types/internal/user/user-registration-types.ts";
import {
  getBlankUserRegistrationErrors,
  getRegistrationDataErrors,
  getSectionsWithErrors,
} from "../../../utils/user/user-registration-errors-utils.ts";
import { useNavigate } from "react-router-dom";
import { LANDING } from "../../../constants/route/internal-route-constants.ts";
import { useToast } from "../../../hooks/useToast.ts";
import type { RegistrationContextData } from "../../../types/internal/context/context-types.ts";
import { UserRegistrationContext } from "../../../context/UserRegistrationContext.ts";
import { saveUser } from "../../../service/userService.ts";
import { handleErrors } from "../../../utils/api/api-common-error-utils.ts";
import type { SectionsHandler } from "../../../hooks/useSections.ts";
import { UserBasicDataSectionLayout } from "./Templates/templates/User/Registration/UserBasicDataSectionLayout.tsx";
import { UserContactSectionLayout } from "./Templates/templates/User/Registration/UserContactSectionLayout.tsx";
import { UserEmploymentSectionLayout } from "./Templates/templates/User/Registration/UserEmploymentSectionLayout.tsx";
import { UserWorkloadsSectionLayout } from "./Templates/templates/User/Registration/UserWorkloadsSectionLayout.tsx";
import { UserNotesSectionLayout } from "./Templates/templates/User/Registration/UserNotesSectionLayout.tsx";
import type { UserRegistrationErrors } from "../../../types/internal/user/user-registration-error-types.ts";
import type { CreateUserRequest } from "../../../types/api/user/user-api-request-types.ts";

const sectionComponents: Record<string, React.ReactNode> = {
  BASIC_INFORMATION: <UserBasicDataSectionLayout />,
  CONTACT_INFORMATION: <UserContactSectionLayout />,
  EMPLOYMENT_INFORMATION: <UserEmploymentSectionLayout />,
  WORKLOAD: <UserWorkloadsSectionLayout />,
  NOTES: <UserNotesSectionLayout />,
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
      navigate(LANDING);
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
        <CancelButton actionText="Cancel" action={() => navigate(LANDING)} />
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
