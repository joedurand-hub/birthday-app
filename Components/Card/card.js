import Image from "next/image";
import card from "../../styles/card.module.css";

function Card({ firstName, lastName, birthday, email, image }) {
	return (
		<div className={card.card}>
			<img src="avatar.png" className={card.image} alt="Image not found"></img>
			{/* <Image src={} width={50} height={50} alt="Image not found"/> */}

			<table>
				<tbody>
					<tr className={card.texts}>
						<td className={card.td}>
							{firstName, lastName}
						</td>
						<td className={card.td}>{birthday}</td>
						<td className={card.td}>{email}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Card;
