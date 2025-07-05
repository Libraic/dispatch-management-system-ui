import {
  type DriverRegistrationData,
  type DriverRegistrationError,
  DriverRegistrationSectionEnum,
} from "../types/registration/driver/driver-registration-types.ts";
import { Section } from "./registration-sections/Section.tsx";
import { GeneralDetailsSection } from "./registration-sections/GeneralDetailsSection.tsx";
import * as React from "react";
import { useState } from "react";
import { TruckDetailsSection } from "./registration-sections/TruckDetailsSection.tsx";
import {
  getBlankDriverRegistrationData,
  getBlankDriverRegistrationError,
} from "../utils/registration/driver/driver-registration-utils.ts";
import {
  getDriverRegistrationErrors,
  hasSectionErrors,
} from "../utils/registration/driver/driver-registration-validation.ts";
import { SubmitButton } from "../button/SubmitButton.tsx";
import { CancelButton } from "../button/CancelButton.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { EmploymentData } from "./registration-sections/EmploymentData.tsx";

export const DriverRegistrationForm = () => {
  const [sectionsWithErrors, setSectionsWithErrors] = useState<
    Map<string, boolean>
  >(new Map<string, boolean>());
  const sections = Object.values(DriverRegistrationSectionEnum);
  const [activeSection, setActiveSection] = React.useState<string>(sections[0]);
  const [driverRegistrationData, setDriverRegistrationData] =
    useState<DriverRegistrationData>(getBlankDriverRegistrationData);
  const [driverRegistrationErrors, setDriverRegistrationErrors] =
    useState<DriverRegistrationError>(getBlankDriverRegistrationError());
  const sectionComponents: Record<string, React.ReactNode> = {
    [sections[0]]: (
      <GeneralDetailsSection
        driverRegistrationData={driverRegistrationData}
        driverRegistrationError={driverRegistrationErrors}
        setDriverRegistrationData={setDriverRegistrationData}
      />
    ),
    [sections[1]]: (
      <TruckDetailsSection
        driverRegistrationData={driverRegistrationData}
        driverRegistrationError={driverRegistrationErrors}
        setDriverRegistrationData={setDriverRegistrationData}
      />
    ),
    [sections[2]]: (
      <EmploymentData
        driverRegistrationData={driverRegistrationData}
        setDriverRegistrationData={setDriverRegistrationData}
      />
    ),
  };
  const activeSectionComponent = sectionComponents[activeSection];

  const { companyUuid } = useParams();
  const baseRoute = `/dashboard/${companyUuid}`;
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registrationErrors = getDriverRegistrationErrors(
      driverRegistrationData,
    );
    const currentSectionsWithErrors = new Map<string, boolean>();
    for (const section of sections) {
      currentSectionsWithErrors.set(
        section,
        hasSectionErrors(registrationErrors, section),
      );
    }

    setSectionsWithErrors(currentSectionsWithErrors);
    setDriverRegistrationErrors(registrationErrors);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-5">
          <p className="font-lato font-bold text-[2rem]">Add Driver</p>
          <p className="font-lato font-light text-[1.1rem] mt-2">
            Complete the required information from the sections
          </p>
        </div>

        <div className="flex flex-row gap-x-6 w-[100%] h-[3.5rem] justify-center my-20">
          {sections.map((section, index) => (
            <div className="flex flex-row items-center gap-x-4">
              <Section
                sectionTitle={section}
                sectionIndex={index + 1}
                isLast={index < sections.length - 1}
                isWithErrors={sectionsWithErrors.get(section) ?? false}
                activateSection={setActiveSection}
              />
            </div>
          ))}
        </div>

        <div>{activeSectionComponent}</div>
      </div>
      <div className="flex flex-row items-center justify-center w-screen mb-15 gap-x-10">
        <SubmitButton actionText="Submit" action={handleSubmit} />
        <CancelButton actionText="Quit" action={() => navigate(baseRoute)} />
      </div>
    </div>
  );
};
