import * as React from "react";

export const RegistrationSectionHeader: React.FC<{
  header: string;
  subheader: string;
}> = ({ header, subheader }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] flex-col">
      <p className="font-lato font-bold text-[2rem]">{header}</p>
      <p className="font-lato font-normal text-[1rem]">{subheader}</p>
    </div>
  );
};
