import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../../button/CancelButton.tsx";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  getBlankUserRegistrationData,
  getCreateUserRequestFromRegistrationData,
} from "../../utils/registration/user/user-registration.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import { Toast } from "../../toast/Toast.tsx";
import { BLANK_STRING } from "../../utils/constants/global.ts";
import {
  type SectionData,
  SectionEnum,
} from "../../types/registration/user/section.ts";
import type {
  UserRegistrationData,
  UserRegistrationErrors,
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

const sectionComponents: Record<SectionEnum, React.ReactNode> = {
  BASIC_INFORMATION: <BasicInformation />,
  EMPLOYMENT_INFORMATION: <EmploymentInformation />,
  WORKLOAD: <Workload />,
  NOTES: <Notes />,
};

export const UserRegistrationInputArea: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] =
    useState<UserRegistrationData>(getBlankUserRegistrationData());

  const [registrationDataError, setRegistrationDataError] =
    useState<UserRegistrationErrors>(getBlankUserRegistrationErrors());

  const navigate = useNavigate();

  const [submitButtonText, setSubmitButtonText] = useState<string>("Continue");
  const toastData = useToast();
  const registrationContextData: RegistrationContextData<
    UserRegistrationData,
    UserRegistrationErrors
  > = {
    registrationData,
    setRegistrationData,
    registrationDataError,
  };

  useEffect(() => {
    const submitButtonText = sectionsHandler.isSectionFocused(SectionEnum.NOTES)
      ? "Submit"
      : "Continue";
    setSubmitButtonText(submitButtonText);
  }, [sectionsHandler]);

  const handleErrorsPriorSubmission = () => {
    const errors = getRegistrationDataErrors(registrationData);
    setRegistrationDataError(errors);
    const sectionsErrorsPriorSubmitting = getSectionsWithErrors(errors);
    sectionsHandler.setErrors(sectionsErrorsPriorSubmitting);
    if (sectionsErrorsPriorSubmitting.length === 0) {
      sectionsHandler.next();
    }
  };

  const handleErrorsAfterSubmission = async () => {
    if (sectionsHandler.areAllSectionsComplete()) {
      const createUserRequest: CreateUserRequest =
        getCreateUserRequestFromRegistrationData(registrationData);
      const apiResponse = await saveUser(createUserRequest);
      const errors = handleErrors(
        apiResponse,
        getBlankUserRegistrationErrors,
        (key) => key === "workloads" || key === "notes",
      );

      if (errors == null) {
        navigate(HOME);
      } else if ("message" in errors) {
        toastData.withErrorMessage(errors.message);
      } else {
        const sectionsErrors = getSectionsWithErrors(errors);
        sectionsHandler.setErrors(sectionsErrors);
        setRegistrationDataError(errors);
      }
    }
  };

  const validateRegistrationData = async (e: React.FormEvent) => {
    e.preventDefault();
    handleErrorsPriorSubmission();
    await handleErrorsAfterSubmission();
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
