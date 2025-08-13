import React from "react";

const RadioGroup = ({ name, labelText, options, register, error }) => (
  <div className="mb-4 relative">
    {/* Label utama */}
    <label className="block mb-2 font-medium text-gray-700 text-sm relative">
      {labelText}

      {/* Tooltip error di atas kanan label */}
      {error && (
        <div className="absolute -top-2 right-0 z-20">
          <div className="relative bg-red-500 text-white text-xs font-normal px-2 py-0.5 rounded-sm whitespace-nowrap">
            {error.message}
            <div className="absolute top-4 right-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
          </div>
        </div>
      )}
    </label>

    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 text-sm"
            {...register}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-gray-700 text-sm"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioGroup;
