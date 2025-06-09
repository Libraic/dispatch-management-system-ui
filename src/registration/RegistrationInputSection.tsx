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
    if (groupedErrors.get(SectionEnum.BASIC_INFORMATION) ?? false) {
      sectionsHandler.setError(SectionEnum.BASIC_INFORMATION);
    } else {
      sectionsHandler.next();
    }
  };

  const activeSection = sectionsHandler.getActiveSection();

  return (
    <div className="flex-1 gap-y-5 bg-[#F7F7F7] py-4 pb-3 px-7 overflow-auto">
      {activeSection === SectionEnum.BASIC_INFORMATION && (
        <BasicInformation
          registrationData={registrationData}
          registrationDataError={registrationDataError}
          setRegistrationData={setRegistrationData}
        />
      )}
      {activeSection === SectionEnum.EMPLOYMENT_INFORMATION && (
        <EmploymentInformation
          registrationData={registrationData}
          setRegistrationData={setRegistrationData}
        />
      )}
      {activeSection === SectionEnum.WORKLOAD && (
        <Workload
          registrationData={registrationData}
          setRegistrationData={setRegistrationData}
        />
      )}
      <div className="flex gap-x-2 mt-11">
        <CancelButton actionText="Cancel" action={() => {}} />
        <SubmitButton actionText="Continue" action={validateRegistrationData} />
      </div>
    </div>
  );
};
