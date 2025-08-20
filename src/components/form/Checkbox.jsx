import React from 'react'

const Checkbox = ({ id, name, labelText, register, error, ...props }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <label htmlFor={id} className="text-gray-700 text-sm">
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded text-sm ml-2"
        {...register}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Checkbox