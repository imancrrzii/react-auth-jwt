import { useFormContext } from "react-hook-form";

export default function Step3() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="phone" className="block mb-2 font-semibold">
        Phone
      </label>
      <input
        id="phone"
        type="tel"
        {...register("phone", {
          required: "Nomor telepon wajib diisi",
          pattern: {
            value: /^[0-9]+$/,
            message: "Nomor telepon hanya boleh berisi angka",
          },
          minLength: {
            value: 9,
            message: "Nomor telepon minimal 9 digit",
          },
          maxLength: {
            value: 15,
            message: "Nomor telepon maksimal 15 digit",
          },
        })}
        aria-invalid={errors.phone ? "true" : "false"}
        aria-describedby="phone-error"
        className={`w-full border px-3 py-2 rounded focus:outline-none transition 
          ${errors.phone ? "border-red-500" : "border-gray-300"} 
          focus:border-blue-500`}
      />
      {errors.phone && (
        <p id="phone-error" role="alert" className="text-red-500 text-sm mt-1">
          {errors.phone.message}
        </p>
      )}
    </div>
  );
}
