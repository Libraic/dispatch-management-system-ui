import { SectionEnum } from "../types/authentication.ts";
import { useState } from "react";
import { RegistrationSectionsList } from "./RegistrationSectionsList.tsx";
import { RegistrationInputSection } from "./RegistrationInputSection.tsx";

export const RegistrationForm = () => {
  const [activeSection, setActiveSection] = useState<SectionEnum>(
    SectionEnum.BASIC_INFORMATION,
  );

  return (
    <div className="flex w-screen h-screen">
      <RegistrationSectionsList setActiveSection={setActiveSection} />
      <RegistrationInputSection activeSection={activeSection} />
    </div>
  );
};
