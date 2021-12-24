import { useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import { AnchorCancel } from "../Components/AnchorsButton/anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import formNavBar from '../styles/navBar.module.css'
import button from '../styles/buttons.module.css'
import { useRouter } from "next/router";

function AddBirthday() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [errors, setErrors] = useState({});

	const handleInputChange = function (e) {
		e.preventDefault();
		const eTargetName = e.target.name;
		switch (eTargetName) {
			case "firstName":
				setFirstName(e.target.value);
				break;

			case "lastName":
				setLastName(e.target.value);
				break;

			case "email":
				setEmail(e.target.value);
				break;

			case "birthday":
				birthday(e.target.value);
				console.log(e.target.value);
				break;

			default:
				break;
		}
	};

	const handleSubmit = async () => {
		if(setFirstName === "" || setFirstName === null) {
			return "Todos los campos deben completarse antes de guardar los cambios"
		}
		if(setFirstName.length > 26 || setFirstName < 3){
			"El nombre y el apellido solo aceptan caracteres y hasta 25, revise su entrada"
		}
		e.preventDefault();
		await fetch(
			"https://birthday-app-api.vercel.app/api/v1/john/birthdays/add",
			{
				method: "POST",
				body: JSON.stringify({
					firstName: firstName,
					email: email,
					lastName: lastName,
					birthday: birthday,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		e.target.reset();
		alert("Birthday saved!"); // modal a futuro?
		setFirstName("");
		setLastName("");
		setBirthday("");
		setEmail("");
	};

	return (
		<div className={styles.containerApp}>
			<form
				className={styleForm.form}
				onChange={(e) => handleInputChange(e)}

			>
				<div className={styleForm.form_container}>
				<h1 className={styleForm.form_title}>¡Add a birthday to your list!</h1>
					<label className={styleForm.form_label} htmlFor="firstName">
						{" "}
						Firt name{" "}
					</label>
					<input
						className={styleForm.form_input}
						placeholder=" Name"
						type="text"
						name="firstName"
						minLength={3}
						maxLength={25}
						value={firstName}
						required
					/>

					<label className={styleForm.form_label} htmlFor="lastName">
						{" "}
						Last name{" "}
					</label>
					<input
						className={styleForm.form_input}
						placeholder=" Lastname"
						type="text"
						name="lastName"
						minLength={3}
						maxLength={25}
						value={lastName}
						required
					/>

					<label className={styleForm.form_label} htmlFor="email">
						{" "}
						Email{" "}
					</label>
					<input
						className={styleForm.form_input}
						placeholder=" user@user.com"
						type="text"
						name="email"
						value={email}
						required
					/>

					<label className={styleForm.form_label} htmlFor="birthday">
						{" "}
						Birthday{" "}
					</label>
					<input
						className={styleForm.form_input}
						type="date"
						name="birthday"
						value={birthday}
						required
					/>

				</div>
			</form>
					<nav className={formNavBar.navBar} onSubmit={(e) => handleSubmit(e)}>
						<Link href="/">
							<AnchorCancel name="Cancel" />
						</Link>

						<button
						className={button.button_primary}
							type="submit"
							name="submit"
							value="Submit"
							onClick={() => {
								router.push("/birthdays");
							}}
						>
							Save
						</button>
					</nav>
		</div>
	);
}

export default AddBirthday;
