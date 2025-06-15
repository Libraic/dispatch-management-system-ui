import {
  type RegistrationData,
  type RegistrationDataError,
  type SectionData,
  SectionEnum,
} from "../types/authentication.ts";
import { BasicInformation } from "./sections/basic/BasicInformation.tsx";
import { EmploymentInformation } from "./sections/employment/EmploymentInformation.tsx";
import { Workload } from "./sections/workload/Workload.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { SubmitButton } from "../button/SubmitButton.tsx";
import * as React from "react";
import { useState } from "react";
import {
  getBlankRegistrationData,
  getBlankRegistrationDataError,
  getGroupedErrors,
  getRegistrationDataErrors,
} from "../utils/registration-utils.ts";
import { Notes } from "./sections/notes/Notes.tsx";
import {
  RegistrationContext,
  type RegistrationContextData,
} from "../context/RegistrationContext.ts";
import { useFetchPaginatedCompanies } from "../hooks/useFetchPaginatedCompanies.ts";
import { Toast } from "../toast/Toast.tsx";

export const RegistrationInputSection: React.FC<{
  sectionsHandler: SectionData;
}> = ({ sectionsHandler }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    getBlankRegistrationData(),
  );

  const [registrationDataError, setRegistrationDataError] =
    useState<RegistrationDataError>(getBlankRegistrationDataError());

  const validateRegistrationData = (e: React.FormEvent) => {
    e.preventDefault();
    const error = getRegistrationDataErrors(registrationData);
    setRegistrationDataError(error);
    const groupedErrors = getGroupedErrors(error);
    const errors: SectionEnum[] = [];
    for (const [section, hasErrors] of groupedErrors) {
      if (hasErrors) {
        errors.push(section);
      } else {
        sectionsHandler.removeError(section);
      }
    }

    sectionsHandler.setErrors(errors);

    if (errors.length === 0) {
      sectionsHandler.next();
    }
  };

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

  return error === undefined ? (
    <div className="flex flex-col flex-1 justify-between gap-y-5 bg-[#F7F7F7] overflow-y-auto">
      <div className="flex-1 gap-y-5 py-4 pb-3 px-7 overflow-auto">
        <RegistrationContext value={registrationContextData}>
          {sectionComponents[activeSection]}
        </RegistrationContext>
      </div>
      <div className="flex gap-x-3 mx-5 my-5">
        <CancelButton actionText="Cancel" action={() => {}} />
        <SubmitButton actionText="Continue" action={validateRegistrationData} />
      </div>
    </div>
  ) : (
    <Toast message={error.message} />
  );
};
