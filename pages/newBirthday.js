import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/container.module.css";
import { AnchorToBack } from "../Components/AnchorsButton/anchor"
function NewBirthday() {
	return <div className={styles.containerApp}>
			<Link href='/newBirthday'>
			<AnchorToBack/>
			</Link>
	</div>;
}

export default NewBirthday;
