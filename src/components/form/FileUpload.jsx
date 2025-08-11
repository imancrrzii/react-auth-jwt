import React from 'react'

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
            className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
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

export default FileUpload
