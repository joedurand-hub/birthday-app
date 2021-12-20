import Image from "next/image";
import card from "../../styles/card.module.css";

function Card({ firstName, lastName, birthday, email }) {
	return (
		<div className={card.card}>
			<img src="avatar.png" className={card.image} alt="Image not found"></img>
			<div className={card.texts}>
				<h4 className={card.td}> {firstName, lastName}</h4>
				<h4 className={card.td}>{birthday}</h4>
				<h4 className={card.td}>{email}</h4>
			</div>
		</div>
	);
}

export default Card;
