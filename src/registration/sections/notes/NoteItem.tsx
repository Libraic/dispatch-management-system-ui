import type { ChangeEvent } from "react";
import * as React from "react";
import { Delete } from "../../../button/Delete.tsx";
import { inputFormStyle } from "../../../utils/tailwind.ts";
import { InputFormError } from "../../../global/InputFormError.tsx";
import type {
  NoteData,
  RegistrationData,
} from "../../../types/registration/registration-data.ts";

export const NoteItem: React.FC<{
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errorMessage: string;
  item: NoteData;
}> = ({ setRegistrationData, errorMessage, item }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRegistrationData((prev) => ({
      ...prev,
      notes: prev.notes.map((note) =>
        note.noteId === item.noteId ? { ...note, note: value } : note,
      ),
    }));
  };
  const noteLengthIndicatorColor =
    item.note.length > 200 ? "text-error-red" : "black";
  return (
    <div key={item.noteId} className="flex flex-col">
      <p
        className={`font-roboto-400 text-[0.7rem] ml-0.5 ${noteLengthIndicatorColor}`}
      >{`${item.note.length}/200`}</p>
      <div className="flex flex-row items-center gap-x-10">
        <textarea
          className={`${inputFormStyle} w-[30rem] h-[5rem] resize-none`}
          placeholder="Note"
          value={item.note}
          onChange={handleChange}
        />
        <Delete
          onClick={() =>
            setRegistrationData((prev) => ({
              ...prev,
              notes: prev.notes.filter((n) => n.noteId !== item.noteId),
            }))
          }
        />
      </div>

      {errorMessage.length > 0 && (
        <InputFormError errorMessage={errorMessage} />
      )}
    </div>
  );
};
