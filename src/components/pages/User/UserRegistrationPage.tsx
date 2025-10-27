import { UserRegistrationSectionsList } from "../../organisms/User/Registration/UserRegistrationSectionsList.tsx";
import { UserRegistrationInputArea } from "../../organisms/User/Registration/UserRegistrationInputArea.tsx";
import { useSections } from "../../../hooks/useSections.ts";
import { USER_REGISTRATION_SECTIONS } from "../../../types/internal/user/user-registration-types.ts";

export const UserRegistrationPage = () => {
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
