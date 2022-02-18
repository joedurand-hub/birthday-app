import styles from "./layout.module.css";

function Layout({ children }) {
  return <main className={styles.layout}>{children}</main>;
}

export default Layout;
