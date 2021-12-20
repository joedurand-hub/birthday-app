import getBirthdaysInfo from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import NavBarMobile from "../Components/navBar_Mobile/navBar_Mobile";
import NavBarDesktop from "../Components/navBar_Desktop/navBar_Desktop";
import Card from "../Components/Card/card";
import { startOfToday } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import { addDays, differenceInDays, setYear } from "date-fns";
import { format } from "date-fns";

// eachDayOfInterval devuelve una matriz de fechas dentro de un intervalo dado
// eachDayOfInterval recibe la fecha de inicio y final de intervalos como parámetros

// Lo que tengo que hacer es iterar sobre el array, y obtener las fechas --> listo
// Tengo que setear la fecha inicial (día presente) - *start*
// Tengo que setear un parámetro que sea siempre +7 días a la fecha presente - *end*
// Tengo que realizar un filtrado sobre mis cumpleaños y devolver los que se encuentren entre start y end.

function Birthdays({ data }) {
	const newDay = new Date(); // seteo en hoy cada día
	const currentTime = format(newDay, "yyyy-MM-dd");

	const finishTime = addDays(newDay, 7); // seteo en 7 días el fin de la semana
	const difference = differenceInDays(finishTime, newDay); // diferencia entre ambos

	const allBirthdays = data.birthdays?.map((objectUser) => {
		// todos los cumpleaños
		let nuevasFechas = new Date(objectUser.birthday);
		let fechaConYear = setYear(nuevasFechas, 2021);
		// let fechas = objectUser.birthday.substr(0, 9);
		return { ...objectUser, birthday: fechaConYear };
	});

	const fechasCoincidentes = allBirthdays.filter(
		(objectUser) =>
			differenceInDays(objectUser.birthday, newDay) <= 6 &&
			differenceInDays(objectUser.birthday, newDay) >= 0,
	);

	return (
		<div className={style.container_components}>
			<NavBarDesktop />

			<div className={style.container_cards}>
				{fechasCoincidentes.length > 1 ? (
					<h1> Birthdays coming soon! </h1>
				) : (
					<h1> No Birthdays coming soon </h1>
				)}
				{fechasCoincidentes ? (
					fechasCoincidentes
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
			<NavBarMobile />
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
