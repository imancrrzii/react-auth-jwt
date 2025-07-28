import React from "react";

const Button = ({
  type = "submit",
  text,
  onClick,
  variant,
}) => {
  return (
    <button
      type={type}
      className={`${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
