import { Mail } from "lucide-react";
import Input2 from "../../form/Input2";
import Select from "../../form/Select";
import Textarea from "../../form/Textarea";
import { useFormContext } from "react-hook-form";
import countries from "../../../data/countries";

const Step2 = () => {
  const { countryList, cityList } = countries;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <Mail className="h-6 w-6 text-sky-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Informasi Kontak
        </h2>
      </div>

      <Input2
        id="email"
        name="email"
        type="email"
        labelText="Email"
        placeholder="contoh@email.com"
        register={register("email", {
          required: "Email wajib diisi",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Format email tidak valid",
          },
        })}
        error={errors.email}
      />

      <Input2
        id="phone"
        name="phone"
        type="tel"
        labelText="Nomor Telepon"
        placeholder="08123456789"
        register={register("phone", {
          required: "Nomor telepon wajib diisi",
          pattern: {
            value: /^[0-9+\-\s()]+$/,
            message: "Format nomor telepon tidak valid",
          },
        })}
        error={errors.phone}
      />

      <Select
        id="country"
        name="country"
        labelText="Negara"
        options={countryList}
        register={register("country", {
          required: "Negara wajib dipilih",
        })}
        error={errors.country}
      />

      <Select
        id="city"
        name="city"
        labelText="Kota"
        options={cityList}
        register={register("city", {
          required: "Kota wajib dipilih",
        })}
        error={errors.city}
      />

      <Textarea
        id="address"
        name="address"
        labelText="Alamat Lengkap"
        placeholder="Masukkan alamat lengkap Anda"
        register={register("address", {
          required: "Alamat wajib diisi",
          minLength: { value: 10, message: "Alamat minimal 10 karakter" },
        })}
        error={errors.address}
      />
    </div>
  );
};

export default Step2;

// import { useFormContext } from "react-hook-form";
// import Input from "../../Form/Input";

// export default function Step2() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <Input
//         id="email"
//         name="email"
//         type="email"
//         labelText="Email"
//         placeholder="Masukkan alamat email"
//         variantLabel="block mb-2 font-semibold"
//         variant={`w-full border px-3 py-2 rounded focus:outline-none transition ${
//           errors.email ? "border-red-500" : "border-gray-300"
//         } focus:border-sky-500`}
//         aria-invalid={errors.email ? "true" : "false"}
//         aria-describedby="email-error"
//         {...register("email", {
//           required: "Email wajib diisi",
//           pattern: {
//             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//             message: "Format email tidak valid",
//           },
//         })}
//       />
//       {errors.email && (
//         <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">
//           {errors.email.message}
//         </p>
//       )}
//     </div>
//   );
// }
