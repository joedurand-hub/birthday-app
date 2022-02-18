import Link from "next/link";
import { Anchor, AnchorIcons } from "../AnchorsButton/Anchor";
import styles from "../../styles/navBar.module.css";

function NavBar({ name, href }) {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navBar_logo}>
        <Link href="/birthdays">
          <AnchorIcons alt="Logo" src="/cake.ico" width={45} height={45} />
        </Link>
      </div>
      <div className={styles.navBar_menu}>
        <Anchor name={name} to={href} variant="secondary" />

        <Anchor name="Add birthday" to="/add-birthday" variant="primary" />
      </div>
    </nav>
  );
}

export default NavBar;
