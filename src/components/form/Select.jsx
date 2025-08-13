import React from "react";

const Select = ({
  id,
  name,
  labelText,
  options,
  register,
  error,
  ...props
}) => (
  <div className="mb-4 relative">
    <label
      htmlFor={id}
      className="block mb-2 font-medium text-gray-700 text-sm relative"
    >
      {labelText}
      {error && (
        <div className="absolute top-0 right-0 z-50 max-w-xs bg-red-500 text-white font-normal text-xs px-2 py-0.5 rounded-sm whitespace-nowrap">
          {error.message}
          <div className="absolute top-4 right-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
        </div>
      )}
    </label>
    <select
      id={id}
      name={name}
      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm ${
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
      }`}
      {...register}
      {...props}
    >
      <option value="">Pilih opsi...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
