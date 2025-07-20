import {
  type DriverRegistrationData,
  type DriverRegistrationError,
  DriverRegistrationSectionEnum,
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
} from "../../utils/registration/driver/driver-registration-utils.ts";
import {
  getDriverRegistrationErrors,
  hasSectionErrors,
} from "../../utils/registration/driver/driver-registration-validation.ts";
import { SubmitButton } from "../../button/SubmitButton.tsx";
import { CancelButton } from "../../button/CancelButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { EmploymentData } from "./registration-sections/EmploymentData.tsx";
import type { RegistrationContextData } from "../../types/context/context-types.ts";
import { DriverRegistrationContext } from "../../context/DriverRegistrationContext.ts";
import { RegistrationSectionHeader } from "../../global/RegistrationSectionHeader.tsx";
import { saveDriver } from "../../service/driver-service.ts";
import { useToast } from "../../hooks/useToast.ts";
import { BLANK_STRING } from "../../utils/constants/global.ts";
import { Toast } from "../../toast/Toast.tsx";
import { handleErrors } from "../../utils/registration/common-api-error-utils.ts";

const sections = Object.values(DriverRegistrationSectionEnum);
const sectionComponents: Record<string, React.ReactNode> = {
  [sections[0]]: <GeneralDetailsSection />,
  [sections[1]]: <TruckDetailsSection />,
  [sections[2]]: <EmploymentData />,
};

export const DriverRegistrationForm = () => {
  const [sectionsWithErrors, setSectionsWithErrors] = useState<
    Map<string, boolean>
  >(new Map<string, boolean>());
  const [activeSection, setActiveSection] = React.useState<string>(sections[0]);
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
  const activeSectionComponent = sectionComponents[activeSection];
  const toast = useToast();
  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationErrors = getDriverRegistrationErrors(
      driverRegistrationData,
    );
    setDriverRegistrationErrors(registrationErrors);
    const currentSectionsWithErrors = new Map<string, boolean>();
    for (const section of sections) {
      currentSectionsWithErrors.set(
        section,
        hasSectionErrors(registrationErrors, section),
      );
    }

    if (Array.from(currentSectionsWithErrors.values()).some((value) => value)) {
      setSectionsWithErrors(currentSectionsWithErrors);
    } else {
      const createDriverRequest =
        createCreateDriverRequestFromDriverRegistrationData(
          driverRegistrationData,
          companyUuid!,
        );
      const response = await saveDriver(createDriverRequest);
      const errors = handleErrors(
        response,
        getBlankDriverRegistrationError,
        (_) => false,
      );
      if (errors == null) {
        navigate(baseRoute);
      } else if ("message" in errors) {
        toast.withErrorMessage(errors.message);
      } else {
        setDriverRegistrationErrors(errors as DriverRegistrationError);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <RegistrationSectionHeader
          header="Add Driver"
          subheader="Complete the required information from the sections"
        />
        <div className="flex flex-row gap-x-6 w-[100%] h-[3.5rem] justify-center my-20">
          {sections.map((section, index) => (
            <div className="flex flex-row items-center gap-x-4">
              <Section
                sectionTitle={section}
                sectionIndex={index + 1}
                isLast={index < sections.length - 1}
                isWithErrors={sectionsWithErrors.get(section) ?? false}
                isActive={activeSection === section}
                activateSection={setActiveSection}
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
