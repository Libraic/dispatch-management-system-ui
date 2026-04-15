import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
  SYSTEM_FONT_NORMAL,
} from "../../../../../../tailwind/tailwind-font-vars.ts";
import React, { useRef } from "react";
import { ErrorContainer } from "../../../../../Common/InputForm/public/ErrorContainer.tsx";
import { GoogleIcon } from "../../../../../../shared/components/GoogleIcon/GoogleIcon.tsx";

export const IngestionLoad: React.FC<{
  file: File | null;
  setFile: (file: File) => void;
  errorMessage?: string;
}> = ({ file, setFile, errorMessage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const uploadedFile = e.dataTransfer.files[0];

    if (uploadedFile?.type === "application/pdf") {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile?.type === "application/pdf") {
      setFile(uploadedFile);
    }
  };

  const truncateFileName = (name: string) => {
    if (name.length <= 24) return name;

    const extIndex = name.lastIndexOf(".");
    const ext = name.slice(extIndex);

    const base = name.slice(0, extIndex);

    return `${base.slice(0, 10)}...${base.slice(-5)}${ext}`;
  };

  return (
    <div className="flex flex-col mb-[2rem] gap-y-[1.15rem]">
      <div className="flex justify-center items-center flex-col">
        <p className={`${SYSTEM_FONT_BOLD} text-[1.2rem]`}>
          Upload your Invoice
        </p>
        <p className={`${SYSTEM_FONT_LIGHT} text-[0.9rem]`}>
          The columns that present ambiguities/uncertainties will be left blank
        </p>
      </div>
      <div
        className="flex flex-col items-center justify-center border-[0.15rem] border-dashed border-gray-400 min-h-[15rem] w-[35rem] rounded-[0.5rem] gap-y-[1rem]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <GoogleIcon code="cloud_upload" size={2.5} />
        <div className="flex items-center justify-center flex-col">
          <p className={`${SYSTEM_FONT_LIGHT} text-[0.9rem]`}>
            Drag and drop your document or select from computer
          </p>
          <p className={`${SYSTEM_FONT_LIGHT} text-[0.9rem] text-gray-400`}>
            Supported files: .pdf
          </p>
        </div>

        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />

        {file && (
          <p className={`text-sm ${SYSTEM_FONT_NORMAL}`}>
            {truncateFileName(file.name)}
          </p>
        )}

        <div className="border border-gray-400 rounded-[0.3rem] py-1 px-3 hover:cursor-pointer hover:bg-light-blue hover:border-light-blue hover:text-white">
          <p className={`${SYSTEM_FONT_NORMAL} text-[0.85rem]`}>Select file</p>
        </div>
        <div className="h-[1.5rem] flex items-center">
          {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
        </div>
      </div>
    </div>
  );
};
