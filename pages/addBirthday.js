import { useState } from "react";
import Link from "next/link";
import { AnchorCancel } from "../Components/AnchorsButton/anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import formNavBar from "../styles/navBar.module.css";
import button from "../styles/buttons.module.css";
import { useRouter } from "next/router";

function AddBirthday() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthday, setBirthday] = useState("");

	const emailRegExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

	const handleInputChange = function (e) {
		const eTargetName = e.target.name;
		const value = e.target.value;
		switch (eTargetName) {
			case "firstName":
				setFirstName(value);

				break;

			case "lastName":
				setLastName(value);
				break;

			case "email":
				setEmail(value);
				break;

			case "birthday":
				setBirthday(value);
				break;

			default:
				break;
		}
	};

	const handleSubmit = async (e) => {
		if (emailRegExp.test(e.target.value) && firstName && lastName && birthday) {
			await fetch(
				"https://birthday-app-api.vercel.app/api/v1/john/birthdays/add",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName,
						email,
						lastName,
						birthday,
					}),
				},
			)
				.then((response) => {
					if (response.ok) {
						console.log("method POST:", response);
						return response.json();
					}
				})
				// .then((response) => console.log("Success:", response))
				.then((response) => console.log("Success", response))
				.then((response) => response.redirect(307, "/birthdays"))
				.catch((error) => console.error("Error:", error));

			alert("Birthday saved!");
			setFirstName("");
			setLastName("");
			setEmail("");
			setBirthday("");
		}
	};
	return (
		<div className={styles.containerApp}>
			<form
				className={styleForm.form}
				id="add_birthday"
				onChange={(e) => handleInputChange(e)}
			>
				<div className={styleForm.form_container}>
					<h1 className={styleForm.form_title}>
						¡Add a birthday to your list!
					</h1>
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
						pattern="[A-Za-z ]*"
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
						pattern="[A-Za-z ]*"
						value={lastName}
						required={true}
					/>

					<label className={styleForm.form_label} htmlFor="email">
						{" "}
						Email{" "}
					</label>
					<input
						className={styleForm.form_input}
						placeholder=" user@user.com"
						type="email"
						name="email"
						value={email}
						required={true}
					/>

					<label className={styleForm.form_label} htmlFor="birthday">
						{" "}
						Birthday{" "}
					</label>
					<input
						className={styleForm.form_input}
						type="date"
						max={new Date()}
						name="birthday"
						value={birthday}
						required
					/>
				</div>
			</form>
			<nav className={formNavBar.navBar}>
				<Link href="/birthdays">
					<AnchorCancel name="Cancel" />
				</Link>

				<input
					className={button.button_primary}
					type="submit"
					name="submit"
					value="Save"
					form="add_birthday"
				/>
			</nav>
		</div>
	);
}

export default AddBirthday;
