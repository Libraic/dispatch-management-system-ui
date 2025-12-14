import * as React from "react";

export const ReportTableMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-end items-center w-[90%] gap-x-[10rem] mb-10">
      {children}
    </div>
  );
};
