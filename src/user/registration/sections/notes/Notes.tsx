import { PageHeader } from "../../../../global/PageHeader.tsx";
import { AddNote } from "./AddNote.tsx";

export const Notes = () => {
  return (
    <div>
      <PageHeader
        header="Notes"
        subheader="Additional information about the employee"
      />
      <AddNote />
    </div>
  );
};
