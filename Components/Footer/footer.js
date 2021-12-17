import React from "react";
import styles from "../../styles/footer.module.css";
import { useRouter } from "next/router";
import style from "../../styles/buttons.module.css";

function Footer() {
	const router = useRouter();

	return (
		<footer className={styles.footer}>
			<button
				onClick={() => { router.push("/birthdays")}}
				className={style.button_secondary}>
				Birthdays
			</button>

			<button
				onClick={() => {
					router.push("/newBirthday")}}
				className={style.button_primary}
			>
				+
			</button>
		</footer>
	);
}

export default Footer;
