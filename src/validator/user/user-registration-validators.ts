import {
  BLANK_STRING,
  NOTE_MAX_LENGTH,
} from "../../constants/common/global-constants.ts";
import type { NoteRegistrationData } from "../../types/internal/user/user-registration-types.ts";
import type { ItemError } from "../../types/internal/user/user-registration-error-types.ts";

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

export const validateNotes = (notes: NoteRegistrationData[]) => {
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
