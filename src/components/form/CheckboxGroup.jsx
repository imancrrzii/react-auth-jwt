import React from 'react';

const CheckboxGroup = ({ name, labelText, options, register, error }) => (
  <div className="mb-4 relative">
    <label className="block mb-2 font-medium text-gray-700">{labelText}</label>
    {error && (
      <div className="absolute right-0 -top-6 bg-red-500 text-white text-xs rounded-sm px-2 py-1 shadow-lg z-10">
        {error.message}
        <div className="absolute bottom-[-6px] right-1 w-3 h-3 bg-red-500 rotate-45"></div>
      </div>
    )}

    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={`${name}.${option.value}`}
            type="checkbox"
            value={option.value}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-sm"
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

export default CheckboxGroup;
