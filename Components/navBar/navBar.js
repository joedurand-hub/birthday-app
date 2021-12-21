import Link from "next/link";
import styles from "../../styles/navBar.module.css";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/anchor";

function NavBar() {
	return (
		<nav className={styles.navBar}>
			<Link href="/allBirthdays">
				<AnchorSecondary name="All birthdays" />
			</Link>

			<Link href="/newBirtday">
				<AnchorPrimary name="Add" />
			</Link>
		</nav>
	);
}

export default NavBar;
