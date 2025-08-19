import * as React from "react";
import { Delete } from "../../../../button/Delete.tsx";
import { textAreaStyle } from "../../../../utils/tailwind.ts";
import { InputFormError } from "../../../../global/input-forms/InputFormError.tsx";
import type {
  NoteData,
  UserRegistrationData,
} from "../../../../types/registration/user/user-registration-data.ts";
import {
  alterNote,
  deleteNote,
} from "../../../../utils/registration/user/user-registration.ts";
import { NOTE_PLACEHOLDER } from "../../../../utils/constants/placeholders.ts";

export const NoteItem: React.FC<{
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >;
  errorMessage: string;
  noteData: NoteData;
}> = ({ setRegistrationData, errorMessage, noteData }) => {
  const noteLengthIndicatorColor =
    noteData.note.length > 200 ? "text-error-red" : "black";
  const [placeholder, setPlaceholder] = React.useState(NOTE_PLACEHOLDER);
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
              setPlaceholder(NOTE_PLACEHOLDER);
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
