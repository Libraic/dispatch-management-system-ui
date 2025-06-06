import * as React from "react";

export const RegistrationSectionHeader: React.FC<{
  header: string;
  subheader: string;
}> = ({ header, subheader }) => {
  return (
    <div className="flex items-center justify-center mb-[2rem] flex-col">
      <p className="font-inter-600 text-[1.7rem]">{header}</p>
      <p className="font-inter-300 text-[0.9rem]">{subheader}</p>
    </div>
  );
};
