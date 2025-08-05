const Button = ({
  type = "submit",
  text,
  onClick,
  variant,
  children, 
}) => {
  return (
    <button
      type={type}
      className={`${variant} flex items-center justify-center gap-2`} 
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
