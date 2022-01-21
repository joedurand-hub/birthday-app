import input from "./input.module.css";
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
    <div className={input.field}>
      {label && (
        <label htmlFor={name} className={input.form_label}>
          {label}
        </label>
      )}
      <input
        className={input.form_input}
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
