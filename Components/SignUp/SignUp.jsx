import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./signUp.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Anchor } from "../AnchorsButton/Anchor";
import { format } from "date-fns";

export const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState({ field: "", isValid: null });
  const [lastname, setLastName] = useState({ field: "", isValid: null });
  const [email, setEmail] = useState({ field: "", isValid: null });
  const [password, setPassword] = useState({ field: "", isValid: null });
  const [password2, setPassword2] = useState({ field: "", isValid: null });
  const [dateOfBirth, setDateOfBirth] = useState({
    field: new Date(),
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(null);

  const validateWithExpressions = {
    name_and_lastname: /^[a-zA-ZÀ-ÿ\s]{2,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{8,16}$/,
    birthday: /^(\/|-)(0[1-9]|1[0-2])([0-2][0-9]|3[0-1])\2(\d{4})$/,
  };
  const date = new Date(dateOfBirth.field);
  const birthday = date ? format(date, "MM/dd/yyyy") : null;

  const comparePassword = () => {
    if (password.field.length > 7) {
      if (password.field !== password2.field) {
        setPassword2((prevState) => {
          return { ...prevState, isValid: false };
        });
      } else {
        setPassword2((prevState) => {
          return { ...prevState, isValid: true };
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.isValid === true &&
      lastname.isValid === true &&
      email.isValid === true &&
      password.isValid === true &&
      password2.isValid === true
    ) {
      setFormIsValid(true);
      fetch("https://birthday-app-api.vercel.app/api/v2/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "",
        },
        body: JSON.stringify({
          firstName: name.field,
          lastName: lastname.field,
          email: email.field,
          password: password.field,
          birthday: birthday,
        }),
      })
        .then((response) => {
          if (response.ok) {
            response.json();
            setName({ field: "", isValid: null });
            setLastName({ field: "", isValid: null });
            setEmail({ field: "", isValid: null });
            setPassword({ field: "", isValid: null });
            setPassword2({ field: "", isValid: null });
            setDateOfBirth({ field: new Date() });
            return router.push("/sign-in");
          }
        })
        .catch((error) => {
          alert(error, "An error has occurred, please try again later");
        });
    } else {
      setFormIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        state={name}
        setState={setName}
        label="Name"
        type="text"
        placeholder="Ethan"
        name="name"
        p="El nombre sólo debe contener letras y/o espacios."
        regExpre={validateWithExpressions.name_and_lastname}
      />

      <Input
        label="Last name"
        state={lastname}
        setState={setLastName}
        type="text"
        placeholder="Windhandel"
        name="lastname"
        p="El apellido sólo debe contener letras y/o espacios."
        regExpre={validateWithExpressions.name_and_lastname}
      />
      <Input
        label="Email"
        state={email}
        setState={setEmail}
        type="email"
        placeholder="ethan@windhandel.com"
        name="email"
        p="El email debe contener @ y finalizar .algo"
        regExpre={validateWithExpressions.email}
      />
      <Input
        label="Password"
        state={password}
        setState={setPassword}
        type="password"
        placeholder="********"
        name="password"
        p="Debe tener más de 8 caracteres, tener al menos una letra mayúscula, una letra minúscula, un símbolo especial y un número."
        regExpre={validateWithExpressions.password}
      />
      <Input
        label="Repeat password"
        state={password2}
        setState={setPassword2}
        type="password"
        placeholder="********"
        name="password"
        p="Por favor repita correctamente la contraseña"
        validator={comparePassword}
      />

      <Input
        label="Fecha de nacimiento"
        state={birthday}
        setState={setDateOfBirth}
        type="date"
        name="dateOfBirth"
        p="Ingrese una fecha correcta"
      />

      <p
        className={`${
          formIsValid === false ? styles.failed_to_send : styles.hidden
        }`}
      >
        <b>Error:</b> Please complete the form correctly.
      </p>
      <p
        className={`${
          formIsValid === true ? styles.success_sending : styles.hidden
        }`}
      >
        Account Created!
      </p>
      <Anchor to="sigin" name="Cancel" variant="cancel" />
      <Button onSubmit={handleSubmit} type="submit" name="Aceptar" />
    </form>
  );
};

export default SignUp;
