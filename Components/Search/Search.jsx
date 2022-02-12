import Button from "../Button/Button";
import input from "../Input/input.module.css";
import styles from "./search.module.css";

export const Search = ({ onSubmit }) => {
  return (
    <form className={styles.search_birthdays} onSubmit={onSubmit}>
      <input
        className={input.form_input}
        name="search"
        type="text"
        placeholder="Search by name or email"
      />
      <Button type="submit" name="Search" variant="search" />
    </form>
  );
};

export default Search;
