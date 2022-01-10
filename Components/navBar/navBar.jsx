import Link from "next/link";
import styles from "../../styles/navBar.module.css";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/Anchor";

function NavBar() {
	return (
		<nav className={styles.navBar}>
			<Link href="/all-birthdays" passHref={true}>
				<AnchorSecondary name="All birthdays" />
			</Link>

			<Link href="/add-birthday" passHref={true}>
				<AnchorPrimary name="Add" />
			</Link>
		</nav>
	);
}

export default NavBar;
