import * as React from "react";
import { Add } from "../../../../button/Add.tsx";
import { NoteItem } from "./NoteItem.tsx";
import { UserRegistrationContext } from "../../../../context/UserRegistrationContext.ts";
import { prepopulateNote } from "../../../../utils/user/user-registration.ts";
import { getNoteErrorMessage } from "../../../../utils/user/user-registration-errors.ts";

export const AddNote = () => {
  const context = React.useContext(UserRegistrationContext)!;
  const { registrationData, setRegistrationData, registrationDataError } =
    context;
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add onClick={() => prepopulateNote(setRegistrationData)} />
        <p className="font-roboto-400">Add Note</p>
      </div>

      <div className="flex flex-col gap-y-15">
        {registrationData.notes.map((note) => (
          <NoteItem
            setRegistrationData={setRegistrationData}
            errorMessage={getNoteErrorMessage(registrationDataError, note)}
            noteData={note}
          />
        ))}
      </div>
    </div>
  );
};
