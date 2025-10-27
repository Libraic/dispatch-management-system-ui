import { NOTES_HEADER } from "../../../../constants/common/header-constants.ts";
import { PageHeader } from "../../../organisms/Header/PageHeader.tsx";
import { UserNotes } from "../../../organisms/User/Registration/Sections/Note/UserNotes.tsx";

export const UserNotesSectionLayout = () => {
  return (
    <div>
      <PageHeader headerInfo={NOTES_HEADER} />
      <UserNotes />
    </div>
  );
};
