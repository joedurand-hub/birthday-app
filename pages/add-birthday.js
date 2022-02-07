import { useState } from "react";
import styles from "../styles/container.module.css";
import { useRouter } from "next/router";
import Form from "../Components/Form/Form";

function AddBirthday() {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
  });

  const handleInputChange = function (e) {
    const eTargetName = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [eTargetName]: value });
  };

  const handleSubmit = (e) => {
    fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        birthday: values.birthday,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Birthday saved!");
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
        onChange={(e) => handleInputChange(e)}
        values={values}
        title={"¡Add a birthday to your list!"}
      ></Form>
    </div>
  );
}

export default AddBirthday;
