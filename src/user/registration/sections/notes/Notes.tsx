import { RegistrationSectionHeader } from "../../../../global/RegistrationSectionHeader.tsx";
import { AddNote } from "./AddNote.tsx";

export const Notes = () => {
  return (
    <div>
      <RegistrationSectionHeader
        header="Notes"
        subheader="Additional information about the employee"
      />
      <AddNote />
    </div>
  );
};
