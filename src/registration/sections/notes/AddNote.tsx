import * as React from "react";
import { Add } from "../../../button/Add.tsx";
import { NoteItem } from "./NoteItem.tsx";
import { RegistrationContext } from "../../../context/RegistrationContext.ts";

export const AddNote = () => {
  const context = React.useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }
  const { registrationData, setRegistrationData, registrationDataError } =
    context;
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
