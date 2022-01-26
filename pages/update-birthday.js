import { useReducer } from "react";
import Form from "../Components/Form/Form";
import styles from "../styles/container.module.css";
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
          alert("Birthday updated!");
          router.push("/birthdays");
          return response.json();
        }
      })
      .catch((error) => {
        alert("An error has occurred, please try again later");
      });
  };

  return (
    <div className={styles.containerApp}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        onChange={handleInputAction}
        values={state}
        title={"Edit the birthday Card!"}
      ></Form>
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
    return {
      props: { user },
    };
  } catch (error) {
  }
}
