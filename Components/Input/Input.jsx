import styles from "./input.module.css";
const InputField = ({
  p,
  label,
  name,
  placeholder,
  type,
  minLength,
  maxLength,
  pattern,
  state,
  setState,
  regExpre,
}) => {
  const onChange = (e) => {
    setState({ ...state, field: e.target.value });
  };

  const validateInput = (e) => {
    if (regExpre) {
      regExpre.test(state.field)
        ? setState({ ...state, isValid: "true" })
        : setState({ ...state, isValid: "false" });
    }
  };
  const inputIsValid = state.isValid;

  const inputValidation =
    (inputIsValid === "true" && styles.isValid) ||
    (inputIsValid === "false" && styles.notIsValid);

  console.log("state", state);

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.form_label}>
          {label}
        </label>
      )}
      <input
        className={`${styles.form_input} || ${inputValidation}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onKeyUp={validateInput}
        onBlur={validateInput}
        value={state.field}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={true}
      />
      {p && (
        <p className={`${inputIsValid === "false" ? styles.form_text_input_error : styles.form_input_error}`} htmlFor={name}>
          {p}
        </p>
      )}
    </div>
  );
};

export default InputField;
