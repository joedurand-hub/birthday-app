import { useState } from "react";

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = data.slice(start, end);
  let itemsToPaginate;
  
  const filteredBirthdays = (search) => {
    const filteredByNameAndEmail = data.filter((elements) => {
      if (elements.firstName.includes(search)) {
        return elements;
      }
      if (elements.email.includes(search)) {
        return elements;
      }
      if (search === undefined || search === null || search.length === 0) {
        return currentData;
      }
    });
    return filteredByNameAndEmail.slice(start, end);
  };


  itemsToPaginate = new Array(numberOfPages)
    .fill()
    .map((irrelevant, index) => index + 1);

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }
  };

  const nextPage = () => {
    if (currentPage + 1 <= data.length) {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, numberOfPages));
    }
  };

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  return {
    previousPage,
    nextPage,
    changePage,
    filteredBirthdays,
    currentData,
    itemsToPaginate,
    currentPage,
  };
};

export default usePagination;
