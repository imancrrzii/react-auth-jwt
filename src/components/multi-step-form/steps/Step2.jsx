import { useFormContext } from "react-hook-form";

export default function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="email" className="block mb-2 font-semibold">
        Email
      </label>
      <input
        id="email"
        type="email"
        {...register("email", {
          required: "Email wajib diisi",
          pattern: {
            value:
              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Format email tidak valid",
          },
        })}
        aria-invalid={errors.email ? "true" : "false"}
        aria-describedby="email-error"
        className={`w-full border px-3 py-2 rounded focus:outline-none transition 
          ${errors.email ? "border-red-500" : "border-gray-300"} 
          focus:border-blue-500`}
      />
      {errors.email && (
        <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">
          {errors.email.message}
        </p>
      )}
    </div>
  );
}
