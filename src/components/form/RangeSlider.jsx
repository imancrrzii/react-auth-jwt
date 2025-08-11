import React from 'react'

const RangeSlider = ({
  id,
  name,
  labelText,
  min = 0,
  max = 100,
  step = 1,
  register,
  error,
  watch,
  ...props
}) => {
  const value = watch && watch(name) !== undefined ? watch(name) : min;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        {...register}
        {...props}
      />
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <span>{min}</span>
        <span className="font-medium text-blue-600">Current: {value}</span>
        <span>{max}</span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default RangeSlider
