import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { SubmitButton } from "../button/SubmitButton.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  getBlankRegistrationData,
  getBlankRegistrationDataError,
  getCreateUserRequestFromRegistrationData,
  getRegistrationDataErrors,
  getSectionsWithErrors,
} from "../utils/registration-utils.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import {
  RegistrationContext,
  type RegistrationContextData,
} from "../context/RegistrationContext.ts";
import { useFetchPaginatedCompanies } from "../hooks/useFetchPaginatedCompanies.ts";
import { Toast } from "../toast/Toast.tsx";
import type { CreateUserRequest } from "../types/api/registration-api.ts";
import { saveUser } from "../service/userService.ts";
import { BLANK_STRING } from "../utils/global-constants.ts";
import {
  type SectionData,
  SectionEnum,
} from "../types/registration/section.ts";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../types/registration/registration-data.ts";
import { ToastTypeEnum } from "../types/toast.ts";

export const RegistrationInputSection: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    getBlankRegistrationData(),
  );

  const [registrationDataError, setRegistrationDataError] =
    useState<RegistrationDataError>(getBlankRegistrationDataError());

  const [submitButtonText, setSubmitButtonText] = useState<string>("Continue");
  const [errorMessage, setErrorMessage] = useState<string>(BLANK_STRING);
  const [toastId, setToastId] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastTypeEnum>(
    ToastTypeEnum.ERROR,
  );

  const activeSection = sectionsHandler.getActiveSection();
  const paginatedCompanies = useFetchPaginatedCompanies();
  const error = paginatedCompanies.error;
  const registrationContextData: RegistrationContextData = {
    registrationData: registrationData,
    setRegistrationData: setRegistrationData,
    registrationDataError: registrationDataError,
    companies: paginatedCompanies.data,
    pagination: paginatedCompanies.pagination,
    error: paginatedCompanies.error,
  };
  const sectionComponents: Record<SectionEnum, React.ReactNode> = {
    BASIC_INFORMATION: <BasicInformation />,
    EMPLOYMENT_INFORMATION: <EmploymentInformation />,
    WORKLOAD: <Workload />,
    NOTES: <Notes />,
  };

  useEffect(() => {
    const buttonText = sectionsHandler.isSectionFocused(SectionEnum.NOTES)
      ? "Submit"
      : "Continue";
    setSubmitButtonText(buttonText);
    if (error !== undefined) {
      setErrorMessage(error.message);
      setToastId(Date.now().toString());
      setToastType(ToastTypeEnum.ERROR);
    }
  }, [
    activeSection,
    setSubmitButtonText,
    error,
    setErrorMessage,
    sectionsHandler,
  ]);

  useEffect(() => {
    async function handleUserCreation() {
      if (sectionsHandler.areAllSectionsComplete()) {
        const createUserRequest: CreateUserRequest =
          getCreateUserRequestFromRegistrationData(registrationData);
        const apiResponse = await saveUser(createUserRequest);
        if (apiResponse.error !== null) {
          const apiErrorMessage = apiResponse.error.message;
          if (apiResponse.error.field !== null) {
            setRegistrationDataError((prev) => {
              const updated = {
                ...prev,
                [apiResponse.error.field as string]: apiErrorMessage,
              };
              const sectionsErrors = getSectionsWithErrors(updated);
              sectionsHandler.setErrors(sectionsErrors);
              return updated;
            });
          } else {
            setErrorMessage(apiErrorMessage);
            setToastId(Date.now().toString());
            setToastType(ToastTypeEnum.ERROR);
          }
        } else {
          setErrorMessage("User created successfully.");
          setToastId(Date.now().toString());
          setToastType(ToastTypeEnum.SUCCESS);
        }
      }
    }

    // TODO: Redirect to a new page
    handleUserCreation().then(() => {});
  }, [registrationData, sectionsHandler]);

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

  return errorMessage.length === 0 ? (
    <div className="flex flex-col flex-1 justify-between gap-y-5 bg-[#F7F7F7] overflow-y-auto">
      <div className="flex-1 gap-y-5 py-4 pb-3 px-7 overflow-auto">
        <RegistrationContext value={registrationContextData}>
          {sectionComponents[activeSection]}
        </RegistrationContext>
      </div>
      <div className="flex gap-x-3 mx-5 my-5">
        <CancelButton actionText="Cancel" action={() => {}} />
        <SubmitButton
          actionText={submitButtonText}
          action={validateRegistrationData}
        />
      </div>
    </div>
  ) : (
    <Toast key={toastId} message={errorMessage} type={toastType} />
  );
};
