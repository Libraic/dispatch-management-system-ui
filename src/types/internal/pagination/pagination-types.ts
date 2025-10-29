import * as React from "react";

export type Pagination = {
  getNumberOfRecords: () => number;
  getNumberOfPages: () => number;
  getCurrentPage: () => number;
  increaseSize: () => void;
  getSize: () => number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
