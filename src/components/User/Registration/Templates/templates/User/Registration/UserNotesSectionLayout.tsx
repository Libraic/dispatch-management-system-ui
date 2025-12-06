import { NOTES_HEADER } from "../../../../../../../constants/common/header-constants.ts";
import { PageHeader } from "../../../../../../Common/Page/PageHeader.tsx";
import { UserNotes } from "../../../../Sections/Note/UserNotes.tsx";

export const UserNotesSectionLayout = () => {
  return (
    <div>
      <PageHeader headerInfo={NOTES_HEADER} />
      <UserNotes />
    </div>
  );
};
