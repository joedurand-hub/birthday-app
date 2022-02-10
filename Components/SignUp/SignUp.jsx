import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./signUp.module.css";
import { useState } from "react";

export const SignUp = () => {
  const [name, setName] = useState({ field: "", isValid: null});
  const [lastname, setLastName] = useState({ field: "", isValid: null });
  const [email, setEmail] = useState({ field: "", isValid: null});
  const [password, setPassword] = useState({ field: "", isValid: null});
  const [password2, setPassword2] = useState({ field: "", isValid: null});
  const [dateOfBirth, setDateOfBirth] = useState({ field: "", isValid: null});


  const validateWithExpressions = {
    name_and_lastname: /^[a-zA-ZÀ-ÿ\s]{3,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{8,16}$/,
  };

  return (
    <form>
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
      />

      <Input
        label="Fecha de nacimiento"
        state={dateOfBirth}
        setState={setDateOfBirth}
        type="date"
        placeholder="mm/dd/yyyy"
        name="dateOfBirth"
        p="Ingrese una fecha correcta"
      />

      <p className={styles.failed_to_send}>
        <b>Error:</b> Please complete the form correctly.
      </p>
      <p className={styles.success_sending}>Account Created!</p>
      <Button type="submit" name="Cancel" variant="cancel" />
      <Button type="submit" name="Aceptar" />
    </form>
  );
};

export default SignUp;
