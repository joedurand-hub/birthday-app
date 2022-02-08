import Input from "../Input/Input";
import styles from "./search.module.css";

export const Search = ({ onChange}) => {
  return (
    <form className={styles.search_birthdays} >
      <Input type="text" placeholder={"Search by name or email"} onChange={onChange} name="search" />

    </form>
  );
};

export default Search;
