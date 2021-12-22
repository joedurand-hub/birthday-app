import getBirthdaysInfo from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import NavBar from "../Components/navBar/navBar";
import Card from "../Components/Card/card";
import { isWithinInterval, addDays, parseISO } from "date-fns";


function Birthdays({birthdayDataInterval}) {
	console.log(birthdayDataInterval)


	return (
		<div className={style.container_components}>
			<div className={style.container_cards}>
				{birthdayDataInterval.length > 1 ? (
					<h1> Birthdays coming soon! </h1>
				) : (
					<h1> No Birthdays coming soon </h1>
				)}
				{birthdayDataInterval ? (
					birthdayDataInterval.birthdays
						?.map((objectUser, index) => (
							<Card
								key={index}
								firstName={objectUser.firstName}
								lastName={objectUser.lastName}
								birthday={objectUser.birthday}
								email={objectUser.email}
							/>
						))
						.slice(0, 50)
				) : (
					<h1>No data has been found</h1>
				)}
			</div>
			<NavBar />
		</div>
	);
}

export default Birthdays;


export async function getServerSideProps() {
	const birthdayDataInterval = [];

		const resp = await fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays");
		let data = await resp.json();

		const todayDate = new Date();
		// const interval = {
		// 	start: todayDate,
		// 	end: addDays(todayDate, 7),
		// };

		data.birthdays?.map((objDataUser) => {
			const birthdaysInterval = isWithinInterval(parseISO(objDataUser.birthday), {start: todayDate, end: addDays(todayDate, 7)});
			if (birthdaysInterval) {
				birthdayDataInterval.push(objDataUser);
			}
		})

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { birthdayDataInterval },
	};
}