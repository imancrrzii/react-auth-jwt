import React from 'react'

const Toggle = ({ id, name, labelText, register, error, watch, ...props }) => {
  const isChecked = watch && watch(name);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-medium text-gray-700">
          {labelText}
        </label>
        <div className="relative">
          <input
            id={id}
            name={name}
            type="checkbox"
            className="sr-only"
            {...register}
            {...props}
          />
          <label htmlFor={id} className="flex items-center cursor-pointer">
            <div
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 text-sm ${
                isChecked ? "bg-blue-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 text-sm ${
                  isChecked ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Toggle
