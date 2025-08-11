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
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700 text-sm">
      {labelText}
    </label>
    <select
      id={id}
      name={name}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm ${
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
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Select;
