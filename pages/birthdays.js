import  getBirthdaysInfo  from "./api/getBirthdaysInfo";
import style from "../styles/container.module.css";
import Footer from "../Components/Footer/footer";
import Card from "../Components/Card/card";


function Birthdays({ data }) {
	console.log("objeto con datos del usuario", data.birthdays)

	return (
		<div className={style.container_cards}>
			{data.birthdays ? data.birthdays?.map((objectUser) => ( 

				<Card firstName={objectUser.firstName}
						lastName={objectUser.lastName}
						birthday={objectUser.birthday}
						email={objectUser.email}
					/>
			)).slice(0, 4) : <h1>No data has been found</h1>} 
		<Footer/>
		</div>
	);
}

export default Birthdays;

export async function getServerSideProps() {
	let data;

	try {
		data = await getBirthdaysInfo();
		console.log("birthdays:", data)

	} catch (error) {
		console.log(error)
		return { notFound: true };
	}
	if (!data) {
		return {
		  notFound: true,
		};
	  }
	return { 
		props: { data }
	};
}





			{/* <main className={style.container_cards}>
				<Card
				firstName={'holaa'}
				lastName={'soyy'}
				birthday={'joeel'}
				email={'durand'}
				/>
			</main>
			<Footer/> */}