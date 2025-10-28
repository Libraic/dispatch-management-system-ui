import * as React from "react";
import type {
  NoteRegistrationData,
  UserRegistrationData,
} from "../../../../../../types/internal/user/user-registration-types.ts";
import { NOTE_PLACEHOLDER } from "../../../../../../constants/common/placeholder-constants.ts";
import { textAreaStyle } from "../../../../../../tailwind/tailwind";
import {
  alterNote,
  deleteNote,
} from "../../../../../../utils/user/user-registration-utils.ts";
import { DeleteButton } from "../../../../../atoms/Button/DeleteButton.tsx";
import { InputFormError } from "../../../../../atoms/InputForm/InputFormError.tsx";

export const UserNote: React.FC<{
  setRegistrationData: React.Dispatch<
    React.SetStateAction<UserRegistrationData>
  >;
  errorMessage: string;
  noteData: NoteRegistrationData;
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
        <DeleteButton
          onClick={() => deleteNote(setRegistrationData, noteData)}
        />
      </div>

      {errorMessage.length > 0 && (
        <InputFormError errorMessage={errorMessage} />
      )}
    </div>
  );
};
