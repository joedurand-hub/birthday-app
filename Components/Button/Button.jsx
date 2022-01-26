import { cc } from "../../helpers/variant.js";
import styles from "../../styles/Buttons.module.css";
const Button = ({
  name,
  onClick,
  onSubmit,
  variant = "primary",
  disabled,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      onSubmit={onSubmit}
      className={cc(
        styles.button,
        styles[variant],
        disabled && styles.disabled
      )}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
