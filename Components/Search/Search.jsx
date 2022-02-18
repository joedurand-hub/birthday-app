import Button from "../Button/Button";
import styles from "./search.module.css";

export const Search = ({ onSubmit }) => {
  return (
    <form className={styles.search_birthdays} onSubmit={onSubmit}>
      <input
        className={styles.search_input}
        name="search"
        type="text"
        placeholder="Search by name or email"
      />
      <Button type="submit" name="Search" variant="search" />
    </form>
  );
};

export default Search;
