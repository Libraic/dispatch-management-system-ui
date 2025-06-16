import { BLANK_STRING, NOTE_MAX_LENGTH } from "./global-constants.ts";
import type {
  NoteData,
  NoteError,
} from "../types/registration/registration-data.ts";

export const validateEmail = (value: string, isMandatory: boolean): string => {
  if (value === BLANK_STRING) {
    return isMandatory ? "The e-mail is required" : BLANK_STRING;
  }

  const parts = value.split("@");
  if (parts.length !== 2) {
    return "The format of the e-mail is invalid";
  }

  const anotherPart = parts[1].split(".");
  if (anotherPart.length !== 2) {
    return "The domain of the e-mail is invalid";
  }

  return BLANK_STRING;
};

export const validatePassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (password === BLANK_STRING) {
    return "The password is required";
  }

  if (password.length < 8) {
    return "Must be at least 8 characters long";
  }

  if (password !== confirmPassword) {
    return "The passwords do not match";
  }

  return BLANK_STRING;
};

export const validateNotes = (notes: NoteData[]) => {
  const errors: NoteError[] = [];
  if (notes.length === 0) {
    return errors;
  }

  for (let note of notes) {
    if (note.note.length > NOTE_MAX_LENGTH) {
      errors.push({
        noteId: note.noteId,
        errorMessage:
          "The note exceeds the maximum number of allowed characters",
      });
    }
  }

  return errors;
};
