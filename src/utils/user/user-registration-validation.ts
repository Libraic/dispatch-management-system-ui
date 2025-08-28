import {
  BLANK_STRING,
  NOTE_MAX_LENGTH,
} from "../constants/global-constants.ts";
import type {
  ItemError,
  NoteData,
} from "../../types/registration/user/user-registration-data.ts";

export const validatePassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (password === BLANK_STRING) {
    return "The password is required";
  }

  if (password.length < 8) {
    return "The password must be at least 8 characters long";
  }

  if (password !== confirmPassword) {
    return "The passwords do not match";
  }

  return BLANK_STRING;
};

export const validateNotes = (notes: NoteData[]) => {
  const errors: ItemError[] = [];
  if (notes.length === 0) {
    return errors;
  }

  for (let note of notes) {
    if (note.note.length > NOTE_MAX_LENGTH) {
      errors.push({
        id: note.noteId,
        field: "note",
        errorMessage: "The note is too long",
      });
    }
  }

  return errors;
};
