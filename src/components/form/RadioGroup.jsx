import React from 'react'

const RadioGroup = ({ name, labelText, options, register, error }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium text-gray-700 text-sm">{labelText}</label>
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
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default RadioGroup
