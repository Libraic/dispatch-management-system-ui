import { UserRegistrationSectionsList } from "./UserRegistrationSectionsList.tsx";
import { UserRegistrationInputArea } from "./UserRegistrationInputArea.tsx";
import { useSections } from "../../hooks/useSections.ts";
import { USER_REGISTRATION_SECTIONS } from "../../types/registration/user/user-registration-data.ts";

export const UserRegistrationForm = () => {
  const sectionsHandler = useSections(
    Object.values(USER_REGISTRATION_SECTIONS),
  );

  return (
    <div className="flex w-screen h-screen">
      <UserRegistrationSectionsList sectionsHandler={sectionsHandler} />
      <UserRegistrationInputArea sectionsHandler={sectionsHandler} />
    </div>
  );
};
