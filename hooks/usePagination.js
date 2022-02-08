import { useState, useEffect } from "react";

export const usePagination = (data, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const [search, setSearch] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    return data.filter((elements) => elements.firstName.includes(search))

  };
  
  const handleInputChange = (e) => { // Manipular cambios en el input al suceder un evento
    setCurrentPage(1);
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  useEffect(() => {
    if(isSubmitted) {
      console.log("submiteado")
      filteredBirthdays()
      setIsSubmitted(false)
    }
  }, [isSubmitted])

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
    handleInputChange,
    filteredBirthdays,
    handleSubmit,
    currentData,
    itemsToPaginate,
    currentPage,
  };
};

export default usePagination;
