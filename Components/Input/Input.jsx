import styles from "./input.module.css";
const InputField = ({
  p,
  value,
  label,
  name,
  placeholder,
  type,
  minLength,
  maxLength,
  pattern,
  onChange,
  onKeyUp,
  onBlur,
  regExp,
}) => {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.form_label}>
          {label}
        </label>
      )}
      <input
        className={styles.form_input}
        type={type}
        value={value}
        name={name}
        regExp={regExp}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={true}
      />
      {p && (
        <p className={styles.form_input_error} htmlFor={name}>{p}</p>
      )}
    </div>
  );
};

export default InputField;
