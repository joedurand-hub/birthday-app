import NavBar from "../Components/NavBar/NavBar";
import Card from "../Components/Card/Card";
import { differenceInCalendarDays, setYear, format } from "date-fns";
import style from "../styles/container.module.css";

function Birthdays({ data }) {
	const newDay = new Date();

	const allBirthdays = data.birthdays?.map((objectUser) => {
		return {
			...objectUser,
			birthday: setYear(new Date(objectUser.birthday), 2022),
		};
	});

	const dataMatching = allBirthdays.filter((objectUser) => {
		const birthdayCalendarDaysDifference = differenceInCalendarDays(
			objectUser.birthday,
			newDay,
		);
		return (
			birthdayCalendarDaysDifference <= 6 && birthdayCalendarDaysDifference >= 0
		);
	});

	return (
		<div className={style.container_components}>
			<div className={style.container_cards}>
				{dataMatching.length > 1 ? (
					<h1 className={style.container_cards_title}>
						Birthdays coming soon!
					</h1>
				) : (
					<h1 className={style.container_cards_title}>
						No Birthdays coming soon
					</h1>
				)}
				{dataMatching
					?.map((objectUser, index) => (
						<Card
							key={index}
							firstName={objectUser.firstName}
							lastName={objectUser.lastName}
							birthday={format(objectUser.birthday, "yyyy-MM-dd")}
							email={objectUser.email}
						/>
					))
					.slice(0, 50)}
			</div>
			<NavBar />
		</div>
	);
}

export default Birthdays;

export async function getServerSideProps() {
	const resp = await fetch(
		"https://birthday-app-api.vercel.app/api/v1/john/birthdays",
	);
	const data = await resp.json();

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data },
	};
}
