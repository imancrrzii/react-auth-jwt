import React from "react";

const Button = ({
  type = "submit",
  text,
  onClick,
  variant,
  children, // Tambahkan ini
}) => {
  return (
    <button
      type={type}
      className={`${variant} flex items-center justify-center gap-2`} // Biar teks + ikon rapi
      onClick={onClick}
    >
      {text}
      {children} {/* Tampilkan children seperti ikon */}
    </button>
  );
};

export default Button;
