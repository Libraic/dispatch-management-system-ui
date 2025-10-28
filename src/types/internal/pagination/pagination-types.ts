import * as React from "react";

export type Pagination = {
  getNumberOfRecords: () => number;
  getNumberOfPages: () => number;
  getCurrentPage: () => number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
