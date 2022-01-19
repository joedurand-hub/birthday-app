import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnchorCancel } from "../Components/AnchorsButton/Anchor";
import styles from "../styles/container.module.css";
import styleForm from "../styles/form.module.css";
import NavBar from "../Components/NavBar/NavBar";
import formNavBar from "../styles/navBar.module.css";
import button from "../styles/Buttons.module.css";
import { useRouter } from "next/router";
import Input from "../Components/Input/Input";
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
    console.log(values);
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
          console.log("method POST:", response);
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        router.push("/birthdays");
      })
      .catch((error) => console.error("Error:", error));
    alert("Birthday saved!");
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
      ></Form>
    </div>
  );
}

export default AddBirthday;
