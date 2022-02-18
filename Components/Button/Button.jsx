import { cc } from "../../helpers/variant.js";
import styles from "../../styles/Buttons.module.css";
const Button = ({
  name,
  type,
  onClick,
  onSubmit,
  variant = "primary",
  disabled,
}) => {
  return (
    <button
      type={type}
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


// Creo que acá debería ir la manipulación de errores "failed to send" y
// su respectivo CSS module, teniendo como propiedad un p para mostrar esos errores
// al realizar click en un botón y que no se haya podido completar