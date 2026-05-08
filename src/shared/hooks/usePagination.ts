import React, { useState } from "react";
import type { PageDetails } from "#/shared/types/api.types";

export type Pagination = {
  getNumberOfRecords: () => number;
  getNumberOfPages: () => number;
  getCurrentPage: () => number;
  increaseSize: () => void;
  getSize: () => number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const usePagination = (page: PageDetails): Pagination => {
  const [activePage, setActivePage] = useState(1);
  const [currentSize, setCurrentSize] = useState(page.size);

  const increaseSize = () => {
    setCurrentSize((prev) => {
      const newSize = prev + page.size;
      return newSize > page.totalElements ? page.totalElements : newSize;
    });
  };

  return {
    getNumberOfRecords: () => page.totalElements,
    getNumberOfPages: () => page.totalPages,
    getCurrentPage: () => activePage,
    increaseSize: increaseSize,
    getSize: () => currentSize,
    setCurrentPage: setActivePage,
  };
};
