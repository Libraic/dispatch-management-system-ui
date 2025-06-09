import { RegistrationSectionsList } from "./RegistrationSectionsList.tsx";
import { RegistrationInputSection } from "./RegistrationInputSection.tsx";
import { useNextSection } from "../hooks/useNextSection.ts";

export const RegistrationForm = () => {
  const sectionIterator = useNextSection();

  return (
    <div className="flex w-screen h-screen">
      <RegistrationSectionsList
        setActiveSection={sectionIterator.setActiveSection}
      />
      <RegistrationInputSection sectionIterator={sectionIterator} />
    </div>
  );
};
