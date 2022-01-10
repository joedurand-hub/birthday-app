import React from "react";
import Link from "next/link";
import { AnchorToBack } from "../Components/AnchorsButton/Anchor";

function allBirthdays({ data }) {
	return (
		<div className={styles.containerApp}>
			<Link href="/birthdays" passHref>
				<AnchorToBack />
			</Link>
		</div>
	);
}

export default allBirthdays;
