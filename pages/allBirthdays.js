import getBirthdaysInfo from "./api/getBirthdaysInfo";
import React from "react";
import Link from "next/link";
import style from "../styles/container.module.css";
import Card from "../Components/Card/card";
import { AnchorToBack } from "../Components/AnchorsButton/anchor";

function allBirthdays({ data }) {
	return (
		<div className={style.container_all_birthdays}>
			<div className={style.container_all_cards}>
				<Link href="/birthdays">
					<AnchorToBack />
				</Link>
				{data.birthdays.length > 1 ? (
					<h1 className={style.container_title}> Birthdays coming soon! </h1>
				) : (
					<h1>
						{" "}
						<Link href="/addBirthday">
							<a>Set your Birthday reminders</a>
						</Link>{" "}
					</h1>
				)}
				{data ? (
					data.birthdays?.map((objectUser, index) => (
						<Card
							key={index}
							firstName={objectUser.firstName}
							lastName={objectUser.lastName}
							birthday={objectUser.birthday}
							email={objectUser.email}
						/>
					))
				) : (
					<h1>No data has been found</h1>
				)}
				<Link href="/birthdays">
					<AnchorToBack />
				</Link>
			</div>
		</div>
	);
}

export default allBirthdays;

export async function getServerSideProps() {
	const data = await getBirthdaysInfo();

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data },
	};
}
