import { useFormContext } from "react-hook-form";

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="name" className="block mb-2 font-semibold">
        Nama Lengkap
      </label>
      <input
        id="name"
        {...register("name", {
          required: "Nama wajib diisi",
          minLength: {
            value: 3,
            message: "Nama minimal 3 karakter",
          },
          pattern: {
            value: /^[A-Za-z\s]+$/i,
            message: "Nama hanya boleh huruf dan spasi",
          },
        })}
        aria-invalid={errors.name ? "true" : "false"}
        aria-describedby="name-error"
        className={`w-full border px-3 py-2 rounded focus:outline-none transition 
          ${errors.name ? "border-red-500" : "border-gray-300"} 
          focus:border-blue-500`}
      />
      {errors.name && (
        <p id="name-error" role="alert" className="text-red-500 text-sm mt-1">
          {errors.name.message}
        </p>
      )}
    </div>
  );
}
