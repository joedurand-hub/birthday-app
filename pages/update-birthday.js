import { useReducer } from "react";
import Link from "next/link";
import { AnchorCancel } from "../Components/AnchorsButton/Anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import formNavBar from "../styles/navBar.module.css";
import button from "../styles/Buttons.module.css";
import { useRouter } from "next/router";

function UpdateBirthday({ user }) {
  const router = useRouter();

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      default:
        state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("state", state);

  const handleInputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  const handleSubmit = () => {
    fetch(
      `https://birthday-app-api.vercel.app/api/v1/john/birthdays/${user.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          birthday: state.birthday,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("method PUT:", response);
          return response.json();
        }
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));
    alert("Birthday updated!");
  };

  return (
    <div className={styles.containerApp}>
      <form
        className={styleForm.form}
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
            value={state.firstName}
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
            name="lastName"
            minLength={3}
            maxLength={25}
            pattern="[A-Za-z ]*"
            value={state.lastName}
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

export async function getServerSideProps({ query }) {
  try {
    const id = query.id;
    const response = await fetch(
      `https://birthday-app-api.vercel.app/api/v1/john/birthdays`
    );
    const { birthdays } = await response.json();
    const user = birthdays.find((objectUser) => objectUser.id == id);
    console.log("user:", user);
    return {
      props: { user },
    };
  } catch (error) {
    console.log(error);
  }
}
