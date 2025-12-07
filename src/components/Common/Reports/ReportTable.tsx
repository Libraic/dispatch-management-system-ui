import * as React from "react";

export const ReportTable = ({ children }: { children: React.ReactNode }) => {
  return <table className="min-w-max border-collapse">{children}</table>;
};
