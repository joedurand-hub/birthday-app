import { useState } from "react";

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const itemsToPaginate = () => {
    return new Array(numberOfPages)
      .fill()
      .map((irrelevant, index) => index + 1);
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }
  };

  const nextPage = () => {
    if (currentPage + 5 < data.length) {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, numberOfPages));
    }
  };

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    console.log("pageNumber", pageNumber);
    setCurrentPage(pageNumber);
  }

  return {
    previousPage,
    nextPage,
    itemsToPaginate,
    changePage,
    currentData,
    currentPage,
  };
};

export default usePagination;
