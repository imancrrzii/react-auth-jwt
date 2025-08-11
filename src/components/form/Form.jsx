import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Settings,
} from "lucide-react";

// Form Components
const Input = ({
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
  <div className="mb-4">
    <label
      htmlFor={id}
      className={variantLabel || "block mb-2 font-medium text-gray-700"}
    >
      {labelText}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={
        variant ||
        `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
        }`
      }
      {...register}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

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
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
      {labelText}
    </label>
    <select
      id={id}
      name={name}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
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

const Checkbox = ({ id, name, labelText, register, error, ...props }) => (
  <div className="mb-4">
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        {...register}
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {labelText}
      </label>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const RadioGroup = ({ name, labelText, options, register, error }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium text-gray-700">{labelText}</label>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${name}-${option.value}`}
            name={name}
            type="radio"
            value={option.value}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            {...register}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

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
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isChecked ? "bg-blue-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
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

const Textarea = ({
  id,
  name,
  labelText,
  placeholder,
  rows = 4,
  register,
  error,
  ...props
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
      {labelText}
    </label>
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
      }`}
      {...register}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

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
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const FileUpload = ({
  id,
  name,
  labelText,
  accept,
  register,
  error,
  ...props
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
      {labelText}
    </label>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
      <div className="space-y-1 text-center">
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor={id}
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>Upload a file</span>
            <input
              id={id}
              name={name}
              type="file"
              accept={accept}
              className="sr-only"
              {...register}
              {...props}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

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





export default {
  Input,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
  Textarea,
  RangeSlider,
  CheckboxGroup,
  ColorPicker,
  NumberInput,
  FileUpload,
};
