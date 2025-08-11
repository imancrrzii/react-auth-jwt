import React from 'react'

const CheckboxGroup = ({ name, labelText, options, register, error }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium text-gray-700">{labelText}</label>
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
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default CheckboxGroup
