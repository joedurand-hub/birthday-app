import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.content}>
        <a
          rel="noreferrer noopener"
          href="https://www.linkedin.com/in/joeldurand0/"
          target="_blank"
        >
          <i><FaLinkedin className={styles.content_contact_icons} /></i>
        </a>
      <p className={styles.content_contact_tale}>Made by Joel Durand</p>
        <a
          rel="noreferrer noopener"
          href="https://github.com/joedurand-hub"
          target="_blank"
        >
          <i><FaGithub className={styles.content_contact_icons} /></i>
        </a>
    </footer>
  );
}

export default Footer;
