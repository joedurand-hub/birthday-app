import styles from "../../styles/navBar.module.css";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/anchor";
import Link from "next/link";

function navBarDesktop() {
	return (
		<nav className={styles.navBarDesktop}>
			<Link href="/allBirthdays">
				<AnchorSecondary name="All birthdays" />
			</Link>

			<Link href="/newBirtday">
				<AnchorPrimary name="Add" />
			</Link>
		</nav>
	);
}

export default navBarDesktop;
