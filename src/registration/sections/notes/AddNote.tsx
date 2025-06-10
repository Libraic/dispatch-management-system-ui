import * as React from "react";
import type {
  RegistrationData,
  RegistrationDataError,
} from "../../../types/authentication.ts";
import { Add } from "../../../button/Add.tsx";
import { NoteItem } from "./NoteItem.tsx";

export const AddNote: React.FC<{
  registrationData: RegistrationData;
  registrationDataError: RegistrationDataError;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, registrationDataError, setRegistrationData }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row items-center gap-x-3">
        <Add
          onClick={() =>
            setRegistrationData((prev) => ({
              ...prev,
              notes: [
                ...prev.notes,
                {
                  noteId: Date.now().toString(),
                  note: "",
                },
              ],
            }))
          }
        />
        <p className="font-roboto-400">Add Note</p>
      </div>

      <div className="flex flex-col gap-y-15">
        {registrationData.notes.map((note) => (
          <NoteItem
            setRegistrationData={setRegistrationData}
            errorMessage={
              registrationDataError.notesError
                .filter((n) => n.noteId === note.noteId)
                .map((n) => n.errorMessage)[0] ?? { errorMessage: "" }
            }
            item={note}
          />
        ))}
      </div>
    </div>
  );
};
