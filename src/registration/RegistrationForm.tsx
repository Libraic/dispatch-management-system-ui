import { RegistrationSectionsList } from "./RegistrationSectionsList.tsx";
import { RegistrationInputSection } from "./RegistrationInputSection.tsx";
import { useSectionsHandler } from "../hooks/useSectionsHandler.ts";

export const RegistrationForm = () => {
  const sectionsHandler = useSectionsHandler();

  return (
    <div className="flex w-screen h-screen">
      <RegistrationSectionsList sectionsHandler={sectionsHandler} />
      <RegistrationInputSection sectionsHandler={sectionsHandler} />
    </div>
  );
};
