import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./signin.module.css";
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";

export const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState({ field: "", isValid: null });
  const [password, setPassword] = useState({ field: "", isValid: null });
  const [formIsValid, setFormIsValid] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // if (email.isValid === true && password.isValid === true) {
    //   setFormIsValid(true);
      fetch("https://birthday-app-api.vercel.app/api/v2/signin", {
        mode: 'no-cors',
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.field,
          password: password.field,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("response:", response, "Lograste iniciar sesion")
            response.json();
            setEmail({ field: "", isValid: null });
            setPassword({ field: "", isValid: null });
            return router.push("/birthdays");
          }
        })
        .catch((error) => {
          console.log("error:", error)
          alert(error, "An error has occurred, please try again later");
        });
    // } else {
    //   setFormIsValid(false);
    // }
  };

  return (
    <form className={styles.container_field} onSubmit={handleLogin}>
      <Image className={styles.mobile_login}
      src="/login.png"
      width="200"
      height="150"
      alt="Mobile login"/>
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
        <b>Error:</b> the data does not match our records.
      </p>
      
      <div className={styles.container_buttons_signin}>
        <Button onSubmit={handleLogin} type="submit" name="Log In" />
      </div>
    </form>
  );
};

export default SignUp;
