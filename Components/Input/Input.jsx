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
  onChange,
  regExpre,
  validator,
}) => {
  const handleInputChange = (e) => {
    setState ? setState({ ...state, field: e.target.value }) : null;
  };

  const validateInput = (e) => {
    if (regExpre) {
      regExpre.test(state.field)
        ? setState({ ...state, isValid: true })
        : setState({ ...state, isValid: false });
    }
    validator && validator();
  };

  const inputValidation = state
    ? (state.isValid === true && styles.isValid) ||
      (state.isValid === false && styles.notIsValid)
    : styles.form_input;

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
        value={state && state.field}
        onChange={onChange ? onChange : handleInputChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={true}
      />
      {p && (
        <p
          className={`${
            state.isValid === false
              ? styles.form_text_input_error
              : styles.form_text
          }`}
          htmlFor={name}
        >
          {p}
        </p>
      )}
    </div>
  );
};

export default InputField;
