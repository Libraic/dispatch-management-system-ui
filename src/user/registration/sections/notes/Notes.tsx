import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AddNote } from "./AddNote.tsx";
import { NOTES_HEADER } from "../../../../utils/constants/headers.ts";

export const Notes = () => {
  return (
    <div>
      <PageHeader headerInfo={NOTES_HEADER} />
      <AddNote />
    </div>
  );
};
