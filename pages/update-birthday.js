import { useState, useReducer } from "react";
import Link from "next/link";
import { AnchorCancel } from "../Components/AnchorsButton/Anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import formNavBar from "../styles/navBar.module.css";
import button from "../styles/Buttons.module.css";
import { useRouter } from "next/router";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  birthday: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        // comment from me.
        // for me.
        //The payload has the "key" property that allows me to dynamically handle multiple inputs
        [action.payload.key]: action.payload.value,
      };
    default:
      state;
  }
};

function UpdateBirthday() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);

  const handleInputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  const handleSubmit = (e) => {
    fetch(`https://birthday-app-api.vercel.app/api/v1/john/birthdays/${id}`, {
      method: "PUT",
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
          <h1 className={styleForm.form_title}>Edit the information.</h1>
          <label className={styleForm.form_label} htmlFor="firstName">
            First name
          </label>
          <input
            onChange={handleInputAction}
            className={styleForm.form_input}
            placeholder="Name"
            type="text"
            value={state.firstname}
            name="firstName"
            minLength={3}
            maxLength={25}
            pattern="[A-Za-z ]*"
            required
          />
          <label className={styleForm.form_label} htmlFor="lastName">
            Last name
          </label>
          <input
            onChange={handleInputAction}
            className={styleForm.form_input}
            placeholder="Last name"
            type="text"
            name="lastname"
            minLength={3}
            maxLength={25}
            pattern="[A-Za-z ]*"
            value={state.lastname}
            required={true}
          />

          <label className={styleForm.form_label} htmlFor="email">
            Email
          </label>
          <input
            onChange={handleInputAction}
            className={styleForm.form_input}
            placeholder="user@user.com"
            type="email"
            name="email"
            value={state.email}
            required={true}
          />

          <label className={styleForm.form_label} htmlFor="birthday">
            Birthday
          </label>
          <input
            onChange={handleInputAction}
            className={styleForm.form_input}
            type="date"
            max={new Date()}
            name="birthday"
            value={state.birthday}
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

export default UpdateBirthday;
