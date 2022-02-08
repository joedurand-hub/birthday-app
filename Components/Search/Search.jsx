import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./search.module.css";

export const Search = ({ onChange, handleSubmit}) => {
  return (
    <form className={styles.search_birthdays} onSubmit={(e) => handleSubmit(e)} >
      <Input
        type="search"
        placeholder={"Search"}
        name="search"
        onChange={onChange}
      />

      <Button type="submit" variant="search" name="Buscar" />
    </form>
  );
};

export default Search;
