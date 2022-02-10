import styles from "./input.module.css";
const InputField = ({
  value,
  label,
  name,
  placeholder,
  type,
  minLength,
  maxLength,
  pattern,
  onChange,
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
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={true}
      />
    </div>
  );
};

export default InputField;
