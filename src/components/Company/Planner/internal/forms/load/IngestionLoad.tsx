import {
  SYSTEM_FONT_BOLD,
  SYSTEM_FONT_LIGHT,
  SYSTEM_FONT_NORMAL,
} from "../../../../../../tailwind/tailwind-font-vars.ts";
import { Svg } from "../../../../../Common/Icon/Svg.tsx";
import React, { useRef } from "react";
import { ErrorContainer } from "../../../../../Common/InputForm/public/ErrorContainer.tsx";

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
        <Svg
          activeColor="#000"
          svgPath="M260-180q-82.92 0-141.46-57.53Q60-295.06 60-378.15q0-74.54 47.96-131.12t118.96-67.04Q246.15-666 317.12-723q70.96-57 162.88-57 108.64 0 184.32 75.68Q740-628.64 740-520v20h12.31q63.23 4.92 105.46 50.85Q900-403.23 900-340q0 66.92-46.15 113.46Q807.69-180 740.77-180H522.31Q492-180 471-201q-21-21-21-51.31v-219.08l-74 72.77-42.15-41.76L480-586.54l146.15 146.16L584-398.62l-74-72.77v219.08q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85H740q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20.77q-56.85 0-98.04 41Q120-438 120-380t41 99q41 41 99 41h100v60H260Zm220-270Z"
          size={40}
        />
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
