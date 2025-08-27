import * as React from "react";
import { useEffect, useState } from "react";
import { BLANK_STRING } from "../utils/constants/global.ts";
import { CellType } from "../types/matrix/matrix-types.ts";
import { sanitizeInput } from "../utils/matrix/cell-utils.ts";

const noErrorBackgroundStyle = "border-b-3 border-r-2 border-[#e6ebfa]";
const erroneousBackgroundStyle = "border-error-red/75 border-3";

export const EditableCell: React.FC<{
  content: string | null;
  setContent: (content: string) => void;
  cellType?: CellType;
  errorMessage?: string;
}> = ({ content, setContent, cellType, errorMessage }) => {
  const [bgColor, setBgColor] = useState(noErrorBackgroundStyle);

  useEffect(() => {
    setBgColor(
      errorMessage ? erroneousBackgroundStyle : noErrorBackgroundStyle,
    );
  }, [errorMessage]);

  return (
    <div
      className={`flex justify-center items-center w-full h-full ${bgColor} p-2 text-center align-middle overflow-hidden break-words whitespace-pre-wrap`}
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
