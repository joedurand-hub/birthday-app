import getBirthdaysInfo from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import NavBar from "../Components/navBar/navBar";
import Card from "../Components/Card/card";
import { format, setYear, differenceInDays } from "date-fns";



function Birthdays({ data }) {
	const newDay = new Date(); 
	const allBirthdays = data.birthdays?.map((objectUser) => {
		let newDate = new Date(objectUser.birthday);
		let dateOnYear = setYear(newDate, 2021);
		return { ...objectUser, birthday: dateOnYear };
	});

	const matchingDates = allBirthdays.filter(
		(objectUser) =>
			differenceInDays(objectUser.birthday, newDay) <= 6 &&
			differenceInDays(objectUser.birthday, newDay) >= 0,
	);

	return (
		<div className={style.container_components}>
			<div className={style.container_cards}>
				{matchingDates.length > 1 ? (
					<h1> Birthdays coming soon! </h1>
				) : (
					<h1> No Birthdays coming soon </h1>
				)}
				{matchingDates ? (
					matchingDates
						?.map((objectUser, index) => (
							<Card
								key={index}
								firstName={objectUser.firstName}
								lastName={objectUser.lastName}
								birthday={format(objectUser.birthday, "yyyy-MM-dd")}
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
	let data;

	try {
		data = await getBirthdaysInfo();
		console.log("birthdays:", data);
	} catch (error) {
		console.log(error);
		return { notFound: true };
	}
	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data },
	};
}
