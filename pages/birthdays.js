import getBirthdaysInfo from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import NavBar from "../Components/navBar/navBar";
import Card from "../Components/Card/card";
import { setYear, differenceInDays } from "date-fns";


function Birthdays({data}) {


	return (
		<div className={style.container_components}>
			<div className={style.container_cards}>
				{data.length > 1 ? (
					<h1> Birthdays coming soon! </h1>
				) : (
					<h1> No Birthdays coming soon </h1>
				)}
				{data ? (
					data.birthdays
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
	let data;

	try {
		data = await getBirthdaysInfo();
		const newDay = new Date(); 

		const allBirthdays = data.birthdays?.map((objectUser) => {
			let newDate = new Date(objectUser.birthday);
			let dateOnYear = setYear(newDate, 2021);
			return { ...objectUser, birthday: dateOnYear };
		});
		
		data = allBirthdays.filter(
			(objectUser) =>
				differenceInDays(objectUser.birthday, newDay) <= 6 &&
				differenceInDays(objectUser.birthday, newDay) >= 0,
		);
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