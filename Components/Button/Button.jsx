const Button = ({ name, className, type, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {name}
    </button>
  );
};

export default Button;
