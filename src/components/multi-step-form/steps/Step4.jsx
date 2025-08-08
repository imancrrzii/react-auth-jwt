import { useFormContext } from "react-hook-form";

export default function Step4() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="address" className="block mb-2 font-semibold">
        Address
      </label>
      <input
        id="address"
        {...register("address", {
          required: "Address wajib diisi",
          minLength: {
            value: 5,
            message: "Alamat minimal 5 karakter",
          },
        })}
        aria-invalid={errors.address ? "true" : "false"}
        aria-describedby="address-error"
        className={`w-full border px-3 py-2 rounded focus:outline-none transition 
          ${errors.address ? "border-red-500" : "border-gray-300"} 
          focus:border-blue-500`}
      />
      {errors.address && (
        <p id="address-error" role="alert" className="text-red-500 text-sm mt-1">
          {errors.address.message}
        </p>
      )}
    </div>
  );
}
