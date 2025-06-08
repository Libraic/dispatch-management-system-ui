import { RegistrationSection } from "./RegistrationSection.tsx";
import { SectionEnum } from "../types/authentication.ts";
import * as React from "react";

export const RegistrationSectionsList: React.FC<{
  setActiveSection: (value: SectionEnum) => void;
}> = ({ setActiveSection }) => {
  return (
    <div className="flex flex-col items-center gap-7 w-1/10 bg-[#f2f4fa] p-6">
      <RegistrationSection
        sectionTitle="Basic Information"
        activateSection={() => {
          setActiveSection(SectionEnum.BASIC_INFORMATION);
        }}
      />
      <RegistrationSection
        sectionTitle="Employment Information"
        activateSection={() => {
          setActiveSection(SectionEnum.EMPLOYMENT_INFORMATION);
        }}
      />
      <RegistrationSection
        sectionTitle="Workload"
        activateSection={() => {
          setActiveSection(SectionEnum.WORKLOAD);
        }}
      />
      <RegistrationSection
        sectionTitle="Notes"
        activateSection={() => {
          setActiveSection(SectionEnum.NOTES);
        }}
      />
    </div>
  );
};
