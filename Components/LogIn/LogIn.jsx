import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./signUp.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState({ field: "", isValid: null });
  const [password, setPassword] = useState({ field: "", isValid: null });
  const [formIsValid, setFormIsValid] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.isValid === true &&
      password.isValid === true
    ) {
      setFormIsValid(true);
      fetch("https://birthday-app-api.vercel.app/api/v2/sigin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "",
        },
        body: JSON.stringify({
          email: email.field,
          password: password.field,
        }),
      })
        .then((response) => {
          if (response.ok) {
            response.json();
            setEmail({ field: "", isValid: null });
            setPassword({ field: "", isValid: null });
            return router.push("/terms");
          }
        })
        .catch((error) => {
          alert(error, "An error has occurred, please try again later");
        });
    } else {
      setFormIsValid(false);
    }
  };

  const clearInputsOnCancel = (e) => {
    setEmail({ field: "", isValid: null });
    setPassword({ field: "", isValid: null });

  }

  return (
    <form className={styles.container_field} onSubmit={handleSubmit}>
      <Input
        label="Email"
        state={email}
        setState={setEmail}
        type="email"
        placeholder="ethan@windhandel.com"
        name="email"
      />
      <Input
        label="Password"
        state={password}
        setState={setPassword}
        type="password"
        placeholder="********"
        name="password"
      />


      <p
        className={`${
          formIsValid === false ? styles.failed_to_send : styles.hidden
        }`}
      >
        <b>Error:</b> El email o la contraseña ingresados es incorrecto.
      </p>
      <p
        className={`${
          formIsValid === true ? styles.success_sending : styles.hidden
        }`}
      >
        Account Created!
      </p>
      <div className={styles.container_buttons_signup}>
        <Button onClick={clearInputsOnCancel} name="Cancel" variant="cancel" />
        <Button onSubmit={handleSubmit} type="submit" name="Create" />
      </div>
    </form>
  );
};

export default SignUp;
