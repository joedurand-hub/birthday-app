import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./search.module.css";
import { usePagination } from "../../hooks/usePagination";

const Search = ({ onClick }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => { // Manipular cambios en el input al suceder un evento
    e.preventDefault();
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  return (
    <form className={styles.search_birthdays}>
      <Input
        type="search"
        placeholder={"Search"}
        name="Search"
        onChange={handleInputChange}
      />
      <Button type="button" variant="search" onClick={onClick} name="Search" />
    </form>
  );
};

export default Search;
