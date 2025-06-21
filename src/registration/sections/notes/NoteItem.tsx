import * as React from "react";
import { Delete } from "../../../button/Delete.tsx";
import { textAreaStyle } from "../../../utils/tailwind.ts";
import { InputFormError } from "../../../global/InputFormError.tsx";
import type {
  NoteData,
  RegistrationData,
} from "../../../types/registration/registration-data.ts";
import { alterNote, deleteNote } from "../../../utils/registration-utils.ts";

export const NoteItem: React.FC<{
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errorMessage: string;
  noteData: NoteData;
}> = ({ setRegistrationData, errorMessage, noteData }) => {
  const noteLengthIndicatorColor =
    noteData.note.length > 200 ? "text-error-red" : "black";
  const [placeholder, setPlaceholder] = React.useState(
    "John Doe is the employee of the month.",
  );
  return (
    <div key={noteData.noteId} className="flex flex-col">
      <p
        className={`font-roboto-400 text-[0.7rem] ml-0.5 ${noteLengthIndicatorColor}`}
      >{`${noteData.note.length}/200`}</p>
      <div className="flex flex-row items-center gap-x-10">
        <textarea
          className={`${textAreaStyle} w-[30rem] h-[5rem] resize-none`}
          placeholder={placeholder}
          value={noteData.note}
          onFocus={() => setPlaceholder("")}
          onBlur={() => {
            if (noteData.note.length === 0) {
              setPlaceholder("John Doe is the employee of the month.");
            }
          }}
          onChange={(e) => alterNote(setRegistrationData, e, noteData)}
        />
        <Delete onClick={() => deleteNote(setRegistrationData, noteData)} />
      </div>

      {errorMessage.length > 0 && (
        <InputFormError errorMessage={errorMessage} />
      )}
    </div>
  );
};
