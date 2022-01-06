import getBirthdaysInfo from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import NavBar from "../Components/navBar/navBar";
import Card from "../Components/Card/card";
import { differenceInDays, setYear, format } from "date-fns";

function Birthdays({ data }) {
	console.log("data:", data);
	const newDay = new Date();

	const allBirthdays = data.birthdays?.map((objectUser) => {
		let newDate = new Date(objectUser.birthday);
		let dateOnYear = setYear(newDate, 2022);
		return { ...objectUser, birthday: dateOnYear };
	});
	
	const dataMatching = allBirthdays.filter(
		(objectUser) =>
		differenceInDays(objectUser.birthday, newDay) <= 6 &&
		differenceInDays(objectUser.birthday, newDay) >= 0,
		);
		console.log("dataMatching:", dataMatching)

	return (
		<div className={style.container_components}>
			<div className={style.container_cards}>
				{dataMatching.length > 1 ? (
					<h1> Birthdays coming soon! </h1>
				) : (
					<h1> No Birthdays coming soon </h1>
				)}
				{dataMatching ? (
					dataMatching
						?.map((objectUser, index) => (
							<Card
								key={index}
								firstName={objectUser.firstName}
								lastName={objectUser.lastName}
								birthday={format(objectUser.birthday, 'yyyy-MM-dd')}
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

	const resp = await fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays");
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
