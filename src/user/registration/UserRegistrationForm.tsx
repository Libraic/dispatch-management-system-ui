import { UserRegistrationSectionsList } from "./UserRegistrationSectionsList.tsx";
import { UserRegistrationInputArea } from "./UserRegistrationInputArea.tsx";
import { useSectionsHandler } from "../../hooks/useSectionsHandler.ts";

export const UserRegistrationForm = () => {
  const sectionsHandler = useSectionsHandler();

  return (
    <div className="flex w-screen h-screen">
      <UserRegistrationSectionsList sectionsHandler={sectionsHandler} />
      <UserRegistrationInputArea sectionsHandler={sectionsHandler} />
    </div>
  );
};
