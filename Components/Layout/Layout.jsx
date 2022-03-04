import Head from "next/head";
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import styles from "./layout.module.css";

function Layout({ title, description, children, name, href }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <NavBar name={name} href={href}/>
      <main className={styles.layout}>{children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;

Layout.defaultProps = {
  title: "Birthdays App",
  description:
    "Birthday App is an application for you to store, manage and consult all the birthdays that you will have soon, in an orderly manner and even send your greetings.",
};
