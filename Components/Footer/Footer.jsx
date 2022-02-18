import { FaLinkedin, FaGithub, MdEmail } from "react-icons/fa";
import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.content}>
      <div>
        <a
          rel="noreferrer noopener"
          href="https://www.linkedin.com/in/joeldurand0/"
          target="_blank"
        >
          <FaLinkedin className={styles.content_contact_icons} />
        </a>
      </div>
      <p className={styles.content_contact_tale}>Made by Joel Durand - 2022</p>
      <div>
        <a
          rel="noreferrer noopener"
          href="https://github.com/joedurand-hub"
          target="_blank"
        >
          <FaGithub className={styles.content_contact_icons} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
