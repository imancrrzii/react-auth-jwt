import React from "react";

const Input2 = ({
  id,
  name,
  labelText,
  placeholder,
  type = "text",
  variant,
  variantLabel,
  register,
  error,
  ...props
}) => (
  <div className="mb-6 relative">
    <label
      htmlFor={id}
      className={variantLabel || "block mb-2 font-medium text-gray-700 text-sm"}
    >
      {labelText}
    </label>

    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={
          variant ||
          `w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }`
        }
        {...register}
        {...props}
      />

      {error && (
        <div className="absolute -top-2 right-0 transform -translate-y-full z-20">
          <div className="relative bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">
            {error.message}

            <div className="absolute top-4 right-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Input2;
