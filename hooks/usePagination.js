import { useState } from "react";

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const changePage = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };
  
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }
  };

  const nextPage = () => {
    if (currentPage + 5 < data.length) {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }
  };

  return { previousPage, nextPage, changePage, currentData, currentPage };
};

export default usePagination;