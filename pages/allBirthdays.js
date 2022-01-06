import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/container.module.css";
import { AnchorToBack } from "../Components/AnchorsButton/anchor"

function allBirthdays() {
	return <div className={styles.containerApp}>
			<Link href='/birthdays'>
			<AnchorToBack/>
			</Link>
	</div>;
}

export default allBirthdays;
