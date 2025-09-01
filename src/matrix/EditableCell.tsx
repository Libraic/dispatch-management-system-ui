import * as React from "react";
import { BLANK_STRING } from "../utils/constants/global-constants.ts";
import { CellType } from "../types/matrix/matrix-types.ts";
import { sanitizeInput } from "../utils/matrix/cell-utils.ts";
import {
  ERRONEOUS_BACKGROUND_STYLE,
  NO_ERROR_BACKGROUND_STYLE,
} from "../utils/matrix/cell-constants.ts";

export const EditableCell: React.FC<{
  content: string | null;
  setContent: (content: string) => void;
  cellType?: CellType;
  errorMessage?: string;
}> = ({ content, setContent, cellType, errorMessage }) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${errorMessage ? ERRONEOUS_BACKGROUND_STYLE : NO_ERROR_BACKGROUND_STYLE} p-2 text-center align-middle overflow-hidden break-words whitespace-pre-wrap`}
      contentEditable
      suppressContentEditableWarning={true}
      onInput={(e: React.FormEvent<HTMLDivElement>) => {
        const input = !e.currentTarget.textContent
          ? BLANK_STRING
          : e.currentTarget.textContent;

        const sanitizedInput = sanitizeInput(input, cellType);
        setContent(sanitizedInput);
        if (e.currentTarget.textContent !== sanitizedInput) {
          e.currentTarget.textContent = sanitizedInput;
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(e.currentTarget);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.execCommand("insertLineBreak");
        }
      }}
      ref={(el) => {
        const nullSafeContent = content || BLANK_STRING;
        if (el && el.innerHTML !== nullSafeContent) {
          el.innerHTML = nullSafeContent;
        }
      }}
    ></div>
  );
};
