import * as React from "react";
import type { Pagination } from "../../../../types/internal/pagination/pagination-types.ts";

export const PageSelector: React.FC<{
  pagination: Pagination;
  fetchFn: (pageNumber: number) => void;
}> = ({ pagination, fetchFn }) => {
  if (pagination.getNumberOfPages() === 1) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-x-3">
      {Array.from({ length: pagination.getNumberOfPages() }, (_, index) => (
        <div
          key={index}
          onClick={() => {
            if (pagination.getCurrentPage() !== index + 1) {
              pagination.setCurrentPage(index + 1);
              fetchFn(index);
            }
          }}
          className={`border-[#cccccc] px-2 py-[0.1rem] rounded-[0.2rem] text-[0.9rem] text-[#808588] hover:cursor-pointer hover:bg-solid-black hover:text-white ${pagination.getCurrentPage() === index + 1 && "bg-solid-black text-white"}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};
