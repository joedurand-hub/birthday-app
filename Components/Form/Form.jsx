import { AnchorCancel } from "../AnchorsButton/Anchor";
import styles from "../../styles/container.module.css";
import styleForm from "../../styles/form.module.css";
import Input from "../Input/Input";
import button from "../../styles/Buttons.module.css";

function Form({ onSubmit, onChange, values }) {
  return (
    <div className={styles.containerApp}>
      <form className={styleForm.form} onSubmit={onSubmit}>
        <h1 className={styleForm.form_title}>¡Add a birthday to your list!</h1>
        <div className={styleForm.form_container}>
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
            placeholder={"user@user.com"}
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
          <nav>
            <Link href="/birthdays" passHref>
              <AnchorCancel name="Cancel" />
            </Link>
            <button
              className={button.button_primary}
              type="submit"
              name="submit"
              value="Save"
              onSubmit={onSubmit}
            ></button>
          </nav>
        </div>
      </form>
    </div>
  );
}

export default Form;
