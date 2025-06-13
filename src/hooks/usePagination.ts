import { useState } from "react";
import type { Pagination } from "../types/global.ts";

export const usePagination = (baseUrl: string): Pagination => {
  const [nextUrl, setNextUrl] = useState<string | null>(baseUrl);
  const [loadNext, setLoadNext] = useState(false);

  return {
    getNextUrl: () => nextUrl,
    setNextUrl,
    shouldLoadNext: () => loadNext,
    setLoadNext,
  };
};
