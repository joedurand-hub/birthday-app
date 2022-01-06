import Link from "next/link";
import styles from "../../styles/navBar.module.css";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/anchor";

function NavBar() {
	return (
		<nav className={styles.navBar}>
			<Link href="/allBirthdays" passHref={true}>
				<AnchorSecondary name="All birthdays" />
			</Link>

			<Link href="/addBirthday" passHref={true}>
				<AnchorPrimary name="Add" />
			</Link>
		</nav>
	);
}

export default NavBar;

