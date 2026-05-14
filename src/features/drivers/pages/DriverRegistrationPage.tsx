import {
  DRIVER_REGISTRATION_SECTIONS,
  type DriverRegistrationData,
  type DriverRegistrationError,
} from "#/features/drivers/components/Registration/types/driverRegistration.types";
import { DriverRegistrationSection } from "#/features/drivers/components/Registration/public/DriverRegistrationSection";
import { DriverBasicInfoSection } from "#/features/drivers/components/Registration/public/DriverBasicInfoSection";
import * as React from "react";
import { useContext, useState } from "react";
import { DriverAssignmentsSection } from "#/features/drivers/components/Registration/public/DriverAssignmentsSection";
import {
  getDriverRegistrationErrors,
  getErroneousSections,
} from "#/features/drivers/validators/driverRegistration.validator";
import { SubmitButton } from "#/ui/Buttons/SubmitButton";
import { CancelButton } from "#/ui/Buttons/CancelButton";
import { useNavigate, useParams } from "react-router-dom";
import { DriverEmploymentDetailsSection } from "#/features/drivers/components/Registration/public/DriverEmploymentDetailsSection";
import { PageHeader } from "#/ui/PageHeader/PageHeader";
import { useSections } from "#/hooks/useSections";
import { DRIVER_REGISTRATION_HEADER } from "#/constants/common/header-constants";
import { DRIVERS_VIEW } from "#/shared/routes/routes";

import { DriverRegistrationContext } from "#/features/drivers/context/DriverRegistrationContext";
import { saveDriver } from "#/features/drivers/api/drivers.api";
import type { RegistrationContextData } from "#/features/drivers/context/context.types";
import { ToastContext } from "#/ui/Toast/context/ToastContext";
import type { ApiError } from "#/shared/types/api.types";
import {
  documentsStatuses,
  driverPositions,
} from "#/features/drivers/mappers/driverRegistration.mapper";

const sections = Object.values(DRIVER_REGISTRATION_SECTIONS);
const sectionComponents: Record<string, React.ReactNode> = {
  [sections[0]]: <DriverBasicInfoSection />,
  [sections[1]]: <DriverAssignmentsSection />,
  [sections[2]]: <DriverEmploymentDetailsSection />,
};

export const DriverRegistrationPage = () => {
  const sectionsHandler = useSections(sections);
  const { companyUuid } = useParams();
  const [driverRegistrationData, setDriverRegistrationData] =
    useState<DriverRegistrationData>({
      documentsStatus: documentsStatuses[0],
      position: driverPositions[0],
    });
  const [driverRegistrationErrors, setDriverRegistrationErrors] =
    useState<DriverRegistrationError>({});
  const registrationContextData: RegistrationContextData<
    DriverRegistrationData,
    DriverRegistrationError
  > = {
    registrationData: driverRegistrationData,
    setRegistrationData: setDriverRegistrationData,
    registrationDataError: driverRegistrationErrors,
    joinableEntityId: companyUuid!!,
  };
  const { showToast } = useContext(ToastContext);

  const baseRoute = `/${companyUuid}${DRIVERS_VIEW}`;
  const navigate = useNavigate();

  const submitButtonLabel = sectionsHandler.areAllSectionsActivated()
    ? "Submit"
    : "Next";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { erroneousSections, registrationErrors } =
      getDriverRegistrationErrors(
        driverRegistrationData,
        sectionsHandler.getActiveSections(),
      );
    setDriverRegistrationErrors(registrationErrors);
    sectionsHandler.setErrors(erroneousSections);
    if (erroneousSections.length === 0) {
      if (!sectionsHandler.areAllSectionsActivated()) {
        sectionsHandler.activateOrFocusNextSection();
      } else {
        const response = await saveDriver(
          driverRegistrationData,
          companyUuid!!,
        );

        if (response.ok) {
          navigate(baseRoute);
          return;
        }

        const error = response.error as ApiError;
        const validationErrors = error.errors;
        if (error.type === "VALIDATION" && validationErrors) {
          setDriverRegistrationErrors(validationErrors);
          sectionsHandler.setErrors(getErroneousSections(validationErrors));
        } else {
          showToast(error.message);
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <PageHeader headerInfo={DRIVER_REGISTRATION_HEADER} />
        <div className="flex flex-row gap-x-6 w-[100%] h-[3.5rem] justify-center my-20">
          {sections.map((section, index) => (
            <div className="flex flex-row items-center gap-x-4" key={index}>
              <DriverRegistrationSection
                sectionTitle={section}
                sectionIndex={index + 1}
                isLast={index < sections.length - 1}
                hasErrors={sectionsHandler.isSectionWithErrors(section)}
                isActive={sectionsHandler.isSectionActive(section)}
                isFocused={sectionsHandler.isSectionFocused(section)}
                focusSection={sectionsHandler.focusSection}
              />
            </div>
          ))}
        </div>
        <DriverRegistrationContext value={registrationContextData}>
          {sectionComponents[sectionsHandler.getFocusedSection()]}
        </DriverRegistrationContext>
      </div>
      <div className="flex flex-row items-center justify-center w-screen mb-15 gap-x-10">
        <SubmitButton actionText={submitButtonLabel} action={handleSubmit} />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
    </div>
  );
};
