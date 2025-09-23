import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "../../types/registration/driver/driver-registration-types.ts";
import { Section } from "./registration-sections/Section.tsx";
import { GeneralDetailsSection } from "./registration-sections/GeneralDetailsSection.tsx";
import * as React from "react";
import { useState } from "react";
import { TruckDetailsSection } from "./registration-sections/TruckDetailsSection.tsx";
import {
  createCreateDriverRequestFromDriverRegistrationData,
  getBlankDriverRegistrationData,
  getBlankDriverRegistrationError,
} from "../../utils/driver/driver-registration-utils.ts";
import {
  getDriverRegistrationErrors,
  getErroneousSection,
} from "../../utils/driver/driver-registration-validation.ts";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { CancelButton } from "../../button/CancelButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { EmploymentData } from "./registration-sections/EmploymentData.tsx";
import type { RegistrationContextData } from "../../types/context/context-types.ts";
import { DriverRegistrationContext } from "../../context/DriverRegistrationContext.ts";
import { PageHeader } from "../../global/PageHeader.tsx";
import { saveDriver } from "../../service/driver-service.ts";
import { useToast } from "../../hooks/useToast.ts";
import { BLANK_STRING } from "../../utils/constants/global-constants.ts";
import { Toast } from "../../toast/Toast.tsx";
import { handleErrors } from "../../utils/api/common-api-error-utils.ts";
import { useSections } from "../../hooks/useSections.ts";
import type {
  ApiResponse,
  Error,
  GroupsErrorResponse,
} from "../../types/api/common.ts";
import type { DriverData } from "../../types/api/driver-api.ts";
import { DRIVER_REGISTRATION_HEADER } from "../../utils/constants/headers.ts";

const sections = Object.values(DRIVER_REGISTRATION_SECTIONS);
const sectionComponents: Record<string, React.ReactNode> = {
  [sections[0]]: <GeneralDetailsSection />,
  [sections[1]]: <TruckDetailsSection />,
  [sections[2]]: <EmploymentData />,
};

export const DriverRegistrationForm = () => {
  const sectionsHandler = useSections(sections);
  const [driverRegistrationData, setDriverRegistrationData] =
    useState<DriverRegistrationData>(getBlankDriverRegistrationData());
  const [driverRegistrationErrors, setDriverRegistrationErrors] =
    useState<DriverRegistrationError>(getBlankDriverRegistrationError());
  const registrationContextData: RegistrationContextData<
    DriverRegistrationData,
    DriverRegistrationError
  > = {
    registrationData: driverRegistrationData,
    setRegistrationData: setDriverRegistrationData,
    registrationDataError: driverRegistrationErrors,
  };
  const activeSectionComponent =
    sectionComponents[sectionsHandler.getActiveSection()];
  const toast = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();

  const processErrors = (
    response: ApiResponse<DriverData, Error | GroupsErrorResponse>,
    registrationErrors: DriverRegistrationError,
  ) => {
    const errors = handleErrors(
      response,
      getBlankDriverRegistrationError,
      (_) => false,
    );
    if (errors == null) {
      navigate(baseRoute);
    } else if (!Array.isArray(errors)) {
      const e = errors as Error;
      toast.withErrorMessage(e.message);
    } else {
      setDriverRegistrationErrors(errors as DriverRegistrationError);
      const err = getErroneousSection(sections, registrationErrors);
      sectionsHandler.setErrors(err.getErroneousSections());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationErrors = getDriverRegistrationErrors(
      driverRegistrationData,
    );
    setDriverRegistrationErrors(registrationErrors);
    const erroneousSections = getErroneousSection(sections, registrationErrors);

    if (erroneousSections.hasErroneousSection()) {
      sectionsHandler.setErrors(erroneousSections.getErroneousSections());
    } else {
      sectionsHandler.clearErrors();
      const createDriverRequest =
        createCreateDriverRequestFromDriverRegistrationData(
          driverRegistrationData,
          companyUuid!,
        );
      const response = await saveDriver(createDriverRequest);
      processErrors(response, registrationErrors);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <PageHeader headerInfo={DRIVER_REGISTRATION_HEADER} />
        <div className="flex flex-row gap-x-6 w-[100%] h-[3.5rem] justify-center my-20">
          {sections.map((section, index) => (
            <div className="flex flex-row items-center gap-x-4" key={index}>
              <Section
                sectionTitle={section}
                sectionIndex={index + 1}
                isLast={index < sections.length - 1}
                isWithErrors={sectionsHandler.isSectionWithErrors(section)}
                isActive={sectionsHandler.isSectionActive(section)}
                activateSection={sectionsHandler.activateSection}
              />
            </div>
          ))}
        </div>
        <DriverRegistrationContext value={registrationContextData}>
          {activeSectionComponent}
        </DriverRegistrationContext>
      </div>
      <div className="flex flex-row items-center justify-center w-screen mb-15 gap-x-10">
        <SubmitButton actionText="Submit" action={handleSubmit} />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
      {toast.getMessage() !== BLANK_STRING && (
        <Toast
          key={toast.getIdentifier()}
          message={toast.getMessage()}
          type={toast.getOperationResult()}
        />
      )}
    </div>
  );
};
