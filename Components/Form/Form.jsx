import { Anchor } from "../AnchorsButton/Anchor";
import styles from "../../styles/container.module.css";
import styleForm from "./form.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import formNavBar from "../../styles/terms.module.css";

function Form({ onSubmit, onChange, values, title }) {
  return (
    <div className={styles.containerApp}>
      <form className={styleForm.form} onSubmit={onSubmit}>
        <div className={styleForm.form_container}>
          <h1 className={styleForm.form_title}>{title}</h1>
          <Input
            label={"First Name"}
            htmlFor={"firstName"}
            onChange={onChange}
            type="text"
            placeholder={"Name"}
            value={values.firstName}
            name="firstName"
            minLength={3}
            maxLength={25}
            pattern="[A-Za-z ]*"
            required={true}
          />

          <Input
            label={"Last Name"}
            htmlFor={"lastName"}
            onChange={onChange}
            type="text"
            name="lastName"
            placeholder={"Last Name"}
            value={values.lastName}
            minLength={3}
            maxLength={25}
            pattern="[A-Za-z ]*"
            required={true}
          />

          <Input
            label={"Email"}
            htmlFor={"email"}
            onChange={onChange}
            type="email"
            name="email"
            placeholder="user@user.com"
            value={values.email}
            required={true}
          />
          <Input
            label={"Birthday"}
            htmlFor={"birthday"}
            onChange={onChange}
            type="date"
            max={new Date()}
            name="birthday"
            value={values.birthday}
            required={true}
          />
          <nav className={formNavBar.navBarSecondary}>
            <Anchor name="Cancel" to="/birthdays" variant="cancel" />
            <Button
              variant="primary"
              type="submit"
              onSubmit={onSubmit}
              name={"Save"}
            />
          </nav>
        </div>
      </form>
    </div>
  );
}

export default Form;
