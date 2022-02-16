import Link from "next/link";
import { Anchor, AnchorIcons } from "../AnchorsButton/Anchor";
import styles from "./footer.module.css";

function Footer({ name, href }) {
  return (
    <nav className={styles.content}>
      <div className={styles.content_contact}>
        <Link href="/birthdays">
          <AnchorIcons alt="Logo" src="/cake.ico" width={45} height={45} />
        </Link>
      </div>
      <p className={styles.content_contact_tale}></p>
      <div className={styles.content_contact_icons}>
        <Anchor name={name} to={href} variant="secondary" />

        <Anchor name="Add birthday" to="/add-birthday" variant="primary" />
      </div>
    </nav>
  );
}

export default Footer;
