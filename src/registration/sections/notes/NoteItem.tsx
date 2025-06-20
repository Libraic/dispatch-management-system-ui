import * as React from "react";
import { Delete } from "../../../button/Delete.tsx";
import { inputFormStyle } from "../../../utils/tailwind.ts";
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
  return (
    <div key={noteData.noteId} className="flex flex-col">
      <p
        className={`font-roboto-400 text-[0.7rem] ml-0.5 ${noteLengthIndicatorColor}`}
      >{`${noteData.note.length}/200`}</p>
      <div className="flex flex-row items-center gap-x-10">
        <textarea
          className={`${inputFormStyle} w-[30rem] h-[5rem] resize-none`}
          placeholder="Note"
          value={noteData.note}
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
