import card from "../../styles/card.module.css";

function Card({ firstName, lastName, birthday, email }) {
	return (
		<div className={card.card}>
			<img src="avatar.png" className={card.image} alt="Image not found"></img>
			<div className={card.texts}>
				<h4 className={card.card_text}> {firstName} {lastName}</h4>
				<span className={card.card_text_span}>{birthday}</span>
				<span className={card.card_text_span}>{email}</span>
			</div>
		</div>
	);
}

export default Card;
