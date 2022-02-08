import Link from "next/link";
import styles from "../../styles/navBar.module.css";
import { Anchor } from "../AnchorsButton/Anchor";


function NavBar({name, href}) {
  return (
    <nav className={styles.navBar}>
      <Anchor name={name} to={href} variant="secondary" />

      <Anchor name="Add birthday" to="/add-birthday" variant="primary" />
    </nav>
  );
}

export default NavBar;
