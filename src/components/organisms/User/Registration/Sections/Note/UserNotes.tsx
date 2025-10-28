import * as React from "react";
import { UserRegistrationContext } from "../../../../../../context/UserRegistrationContext";
import { prepopulateNote } from "../../../../../../utils/user/user-registration-utils.ts";
import { AddButton } from "../../../../../atoms/Button/AddButton.tsx";
import { UserNote } from "./UserNote.tsx";
import { getNoteErrorMessage } from "../../../../../../utils/user/user-registration-errors-utils.ts";

export const UserNotes = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData, registrationDataError } =
    context;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <AddButton onClick={() => prepopulateNote(setRegistrationData)} />
        <p className="font-roboto-400">Add Note</p>
      </div>

      <div className="flex flex-col gap-y-15">
        {registrationData.notes.map((note) => (
          <UserNote
            setRegistrationData={setRegistrationData}
            errorMessage={getNoteErrorMessage(registrationDataError, note)}
            noteData={note}
          />
        ))}
      </div>
    </div>
  );
};
