import * as React from "react";

export const Section: React.FC<{
  sectionTitle: string;
  sectionIndex: number;
  isLast: boolean;
  isWithErrors: boolean;
  isActive: boolean;
  activateSection: (section: string) => void;
}> = ({
  sectionTitle,
  sectionIndex,
  isLast,
  isWithErrors,
  isActive,
  activateSection,
}) => {
  const textColor = !isActive
    ? isWithErrors
      ? "text-error-red"
      : "text-light-blue"
    : "text-white";
  const backgroundColor = isActive
    ? isWithErrors
      ? "bg-error-red"
      : "bg-light-blue"
    : "bg-white";
  const borderColorOnHover = isWithErrors
    ? "hover:border-error-red"
    : "hover:border-light-blue";
  const backgroundColorOnHover = isWithErrors
    ? "hover:bg-error-red"
    : "hover:bg-light-blue";
  const borderColor = isWithErrors ? "border-error-red" : "border-light-blue";
  return (
    <>
      <div
        onClick={() => activateSection(sectionTitle)}
        className={`flex justify-center items-center w-9 h-9 rounded-[50%] border-[0.1rem] cursor-pointer ${borderColor} ${borderColorOnHover} ${backgroundColor} ${backgroundColorOnHover} ${textColor} hover:text-white transition-all ease-in duration-100`}
      >
        <p className="font-lato font-medium text-[1rem]">{sectionIndex}</p>
      </div>
      <p
        className={`font-lato font-regular text-standard-size text-center ${isWithErrors ? "text-error-red" : "text-light-blue"}`}
      >
        {sectionTitle}
      </p>
      {isLast && (
        <div
          className={`w-[8rem] border-[0.063rem]  ${isWithErrors ? "border-error-red" : "border-light-blue"}`}
        ></div>
      )}
    </>
  );
};
