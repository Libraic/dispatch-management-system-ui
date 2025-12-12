import * as React from "react";

export const ReportContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center p-6 pt-[5rem]">
      {children}
    </div>
  );
};
