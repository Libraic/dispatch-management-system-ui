import * as React from "react";

export const ReportTableContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-[90%] overflow-x-auto overflow-y-scroll hide-scrollbar">
      {children}
    </div>
  );
};
