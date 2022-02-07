import { useState } from "react";

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")
  console.log("state search:", search)

  const numberOfPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = data.slice(start, end);

  const filteredBirthdays = () => {
    // Caso de input vacío y se hace click en buscar
    if (search.length === 0) {
      console.log("No search criteria entered")
      return currentData;
    }
    const filtered = data.filter((elements) => elements.firstName.includes(search))
    console.log("search:", filtered) 

    return filtered;
  };
  
  const handleInputChange = (e) => { // Manipular cambios en el input al suceder un evento
    e.preventDefault();
    setCurrentPage(1);
    setSearch(e.target.value);
    console.log(e.target.value);
  };


  const itemsToPaginate = new Array(numberOfPages)
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
    currentData,
    handleInputChange,
    filteredBirthdays,
    itemsToPaginate,
    currentPage,
  };
};

export default usePagination;
