import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./signUp.module.css";
import { useState } from "react";

export const SignUp = () => {
  const [userData, setUserData] = useState({
    field: "",
    isValid: null,
  });

  const handleInputChange = (e) => {
    setUserData({...userData, field: e.target.value })
  }

  const validateInput = (e) => {
    if(regExp) {
      if(regExp.test(userData.field)){
        console.log("input correcto")
      } else {
        console.log("input incorrecto")
      }
    }
  }


// 	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
//	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
//	password: /^.{4,12}$/, // 4 a 12 digitos.
//	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

  return (
    <form>
      <Input
        value={userData.field}
        onKeyUp={validateInput}
        onBlur={validateInput}
        onChange={handleInputChange}
        label="Name"
        type="text"
        placeholder="Ethan"
        name="name"
        p="Mensaje de error del nombre"
      />
      <Input
        label="Last name"
        type="text"
        placeholder="Windhandel"
        name="lastname"
        p="Mensaje de error del apellido"
      />
      <Input
        label="Email"
        type="email"
        placeholder="user@user.com"
        name="email"
        p="Mensaje de error del email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        name="password"
        p="Mensaje de error de la contraseña"
      />
      <Input
        label="Repeat password"
        type="password"
        placeholder="Repeat password"
        name="password"
        p="Mensaje de error de la contraseña"
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
