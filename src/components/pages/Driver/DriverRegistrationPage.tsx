import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "../../../types/internal/driver/driver-registration-types.ts";
import { Section } from "../../atoms/Registration/Section.tsx";
import { DriverGeneralDetailsSection } from "../../organisms/Driver/Registration/DriverGeneralDetailsSection.tsx";
import * as React from "react";
import { useState } from "react";
import { DriverAssetsAssignmentSection } from "../../organisms/Driver/Registration/DriverAssetsAssignmentSection.tsx";
import {
  createCreateDriverRequestFromDriverRegistrationData,
  getBlankDriverRegistrationData,
  getBlankDriverRegistrationError,
} from "../../../utils/driver/driver-registration-utils.ts";
import {
  getDriverRegistrationErrors,
  getErroneousSection,
} from "../../../validator/driver/driver-registration-validatiors.ts";
import { SubmitButton } from "../../atoms/Button/SubmitButton.tsx";
import { CancelButton } from "../../atoms/Button/CancelButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { DriverEmploymentDetailsSection } from "../../organisms/Driver/Registration/DriverEmploymentDetailsSection.tsx";
import type { RegistrationContextData } from "../../../types/internal/context/context-types.ts";
import { DriverRegistrationContext } from "../../../context/DriverRegistrationContext.ts";
import { PageHeader } from "../../organisms/Header/PageHeader.tsx";
import { saveDriver } from "../../../service/driverService.ts";
import { useToast } from "../../../hooks/useToast.ts";
import { BLANK_STRING } from "../../../constants/common/global-constants.ts";
import { Toast } from "../../atoms/Toast/Toast.tsx";
import { handleErrors } from "../../../utils/api/api-common-error-utils.ts";
import { useSections } from "../../../hooks/useSections.ts";
import { DRIVER_REGISTRATION_HEADER } from "../../../constants/common/header-constants.ts";
import { DRIVERS_VIEW } from "../../../constants/route/internal-route-constants.ts";
import type { DriverData } from "../../../types/api/driver/driver-api-response-types.ts";
import type {
  Error,
  GroupsErrorResponse,
} from "../../../types/api/common/api-errors-types.ts";
import type { ApiResponse } from "../../../types/api/common/api-response-types.ts";

const sections = Object.values(DRIVER_REGISTRATION_SECTIONS);
const sectionComponents: Record<string, React.ReactNode> = {
  [sections[0]]: <DriverGeneralDetailsSection />,
  [sections[1]]: <DriverAssetsAssignmentSection />,
  [sections[2]]: <DriverEmploymentDetailsSection />,
};

export const DriverRegistrationPage = () => {
  const sectionsHandler = useSections(sections);
  const { companyUuid } = useParams();
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
    joinableEntityId: companyUuid!!,
  };
  const activeSectionComponent =
    sectionComponents[sectionsHandler.getActiveSection()];
  const toast = useToast();

  const baseRoute = `/dashboard/${companyUuid}${DRIVERS_VIEW}`;
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
