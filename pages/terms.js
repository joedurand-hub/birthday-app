import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import container from "../styles/container.module.css";
import terms from "../styles/terms.module.css";
import { AnchorCancel } from "../Components/AnchorsButton/anchor";
import { useRouter } from "next/router";

function Terms() {
	const router = useRouter();
	const [buttonActive, setButtonActive] = useState(true);

	return (
		<div className={container.containerApp}>
			<Head>
				<title>Birthday App</title>
				<meta name="description" content="Generated by create next app" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/cake.ico" />
			</Head>

			<main className={container.container_content}>
				<div className={terms.terms_instructions}>
					<h1 className={terms.terms_title}>Hello name of user</h1>
					<Image src="/cake.jpg" width={225} height={225} />
					<h4>Author: Joel Durand</h4>
					<p className={terms.terms_paragraph}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>

				<section className={terms.section}>
					<input
						type="checkbox"
						id="terms"
						onChange={() => setButtonActive(!buttonActive)}
					/>
					<label className={terms.label} htmlFor="terms">
						Terms and Conditions
					</label>
				</section>
				<footer className={terms.navBarMobileTerms}>
					<Link href="/">
						<AnchorCancel name="Decline" />
					</Link>

					<button
						onClick={() => {
							router.push("/birthdays");
						}}
						disabled={buttonActive}
						className={terms.button_terms}
					>
						Accept
					</button>
				</footer>
			</main>
		</div>
	);
}

export default Terms;
