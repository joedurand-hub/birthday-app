import { useState } from "react";

export const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(0);

  const filterData = () => data.slice(currentPage, currentPage + 5);

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const nextPage = () => {
    if (currentPage + 5 < data.length) {
      setCurrentPage(currentPage + 5);
    }
  };

  return [filterData, nextPage, previousPage, currentPage];
};
