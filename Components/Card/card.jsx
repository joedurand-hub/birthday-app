import Link from "next/link";
import card from "../../styles/card.module.css";
import Image from "next/image";

function Card({ firstName, lastName, birthday, email }) {
	return (
		<div className={card.card}>
			<Image
				src="/avatar.png"
				width={90}
				height={75}
				className={card.image}
				alt="Avatar"
			/>
			<div className={card.texts}>
				<h4 className={card.card_text}>
					{firstName} {lastName}
				</h4>
				<p className={card.card_text_seconday}>{email}</p>
				<p className={card.card_text_seconday}>{birthday}</p>
			</div>

			{/* <Link href="/update-user"></Link> */}
		</div>
	);
}

export default Card;
