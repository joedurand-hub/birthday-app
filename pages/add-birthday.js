import { useState } from "react";
import Link from "next/link";
import { AnchorCancel } from "../components/AnchorsButton/Anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import formNavBar from "../styles/navBar.module.css";
import button from "../styles/Buttons.module.css";
import { useRouter } from "next/router";

function AddBirthday() {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthday, setBirthday] = useState("");

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

	const handleSubmit = (e) => {
		fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
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
		})
			.then((response) => {
				if (response.ok) {
					console.log("method POST:", response);
					return response.json();
				}
			})
			.then((response) => console.log("Success:", response))
			.catch((error) => console.error("Error:", error));
		alert("Birthday saved!");
	};

	return (
		<div className={styles.containerApp}>
			<form
				className={styleForm.form}
				id="add_birthday"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(e);
					router.push("/birthdays");
				}}
			>
				<div className={styleForm.form_container}>
					<h1 className={styleForm.form_title}>
						¡Add a birthday to your list!
					</h1>
					<label className={styleForm.form_label} htmlFor="firstName">
						Firt name
					</label>
					<input
						onChange={(e) => handleInputChange(e)}
						className={styleForm.form_input}
						placeholder="Name"
						type="text"
						name="firstName"
						minLength={3}
						maxLength={25}
						pattern="[A-Za-z ]*"
						value={firstName}
						required
					/>
					<label className={styleForm.form_label} htmlFor="lastName">
						Last name
					</label>
					<input
						onChange={(e) => handleInputChange(e)}
						className={styleForm.form_input}
						placeholder="Lastname"
						type="text"
						name="lastName"
						minLength={3}
						maxLength={25}
						pattern="[A-Za-z ]*"
						value={lastName}
						required={true}
					/>

					<label className={styleForm.form_label} htmlFor="email">
						Email
					</label>
					<input
						onChange={(e) => handleInputChange(e)}
						className={styleForm.form_input}
						placeholder="user@user.com"
						type="email"
						name="email"
						value={email}
						required={true}
					/>

					<label className={styleForm.form_label} htmlFor="birthday">
						Birthday
					</label>
					<input
						onChange={(e) => handleInputChange(e)}
						className={styleForm.form_input}
						type="date"
						max={new Date().toString()}
						name="birthday"
						value={birthday}
						required
					/>
				</div>
				<nav className={formNavBar.navBar}>
					<Link href="/birthdays" passHref={true}>
						<AnchorCancel name="Cancel" />
					</Link>

					<input
						className={button.button_primary}
						type="submit"
						name="submit"
						value="Save"
					/>
				</nav>
			</form>
		</div>
	);
}

export default AddBirthday;
