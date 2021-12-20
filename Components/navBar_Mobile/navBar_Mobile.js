import Link from "next/link";
import styles from "../../styles/navBar.module.css";
import { AnchorPrimary, AnchorSecondary } from "../AnchorsButton/anchor";

function NavBarMobile() {
	return (
		<footer className={styles.navBarMobile}>
			<Link href="/allBirthdays">
				<AnchorSecondary name="All birthdays" />
			</Link>

			<Link href="/newBirtday">
				<AnchorPrimary name="Add" />
			</Link>
		</footer>
	);
}

export default NavBarMobile;
