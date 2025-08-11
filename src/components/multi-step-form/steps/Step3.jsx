import { Settings } from "lucide-react";
import CheckboxGroup from "../../form/CheckboxGroup";
import RangeSlider from "../../form/RangeSlider";
import Select from "../../form/Select";
import Toggle from "../../form/Toggle";
import FileUpload from "../../form/FileUpload";
import { useFormContext } from "react-hook-form";

const Step3 = () => {
  const { register, formState: { errors }, watch } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-sky-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Preferensi & Pengaturan</h2>
      </div>

      <CheckboxGroup
        name="interests"
        labelText="Minat (pilih semua yang sesuai)"
        options={[
          { value: "tech", label: "Teknologi" },
          { value: "sports", label: "Olahraga" },
          { value: "music", label: "Musik" },
          { value: "travel", label: "Travel" },
          { value: "cooking", label: "Memasak" },
          { value: "reading", label: "Membaca" },
          { value: "gaming", label: "Gaming" }
        ]}
        register={register("interests")}
        error={errors.interests}
      />

      <RangeSlider
        id="experience"
        name="experience"
        labelText="Tingkat Pengalaman (0-10)"
        min={0}
        max={10}
        watch={watch}
        register={register("experience", {
          required: "Tingkat pengalaman wajib dipilih"
        })}
        error={errors.experience}
      />

      <Select
        id="language"
        name="language"
        labelText="Bahasa Utama"
        options={[
          { value: "id", label: "Bahasa Indonesia" },
          { value: "en", label: "English" },
          { value: "ms", label: "Bahasa Melayu" },
          { value: "zh", label: "中文" }
        ]}
        register={register("language", {
          required: "Bahasa wajib dipilih"
        })}
        error={errors.language}
      />

      <Toggle
        id="newsletter"
        name="newsletter"
        labelText="Berlangganan Newsletter"
        watch={watch}
        register={register("newsletter")}
        error={errors.newsletter}
      />

      <Toggle
        id="notifications"
        name="notifications"
        labelText="Terima Notifikasi"
        watch={watch}
        register={register("notifications")}
        error={errors.notifications}
      />

      <Toggle
        id="darkMode"
        name="darkMode"
        labelText="Mode Gelap"
        watch={watch}
        register={register("darkMode")}
        error={errors.darkMode}
      />

      <FileUpload
        id="avatar"
        name="avatar"
        labelText="Upload Foto Profil"
        accept="image/*"
        register={register("avatar")}
        error={errors.avatar}
      />
    </div>
  );
};

export default Step3


// import { useFormContext } from "react-hook-form";
// import Input from "../../Form/Input";

// export default function Step3() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <Input
//         id="phone"
//         name="phone"
//         type="tel"
//         labelText="Nomor Telepon"
//         placeholder="08xxxxxxxxxx"
//         variantLabel="block mb-2 font-semibold"
//         variant={`w-full border px-3 py-2 rounded focus:outline-none transition ${
//           errors.phone ? "border-red-500" : "border-gray-300"
//         } focus:border-sky-500`}
//         aria-invalid={errors.phone ? "true" : "false"}
//         aria-describedby="phone-error"
//         {...register("phone", {
//           required: "Nomor telepon wajib diisi",
//           pattern: {
//             value: /^08[0-9]{8,11}$/,
//             message: "Format nomor telepon tidak valid",
//           },
//         })}
//       />
//       {errors.phone && (
//         <p id="phone-error" role="alert" className="text-red-500 text-sm mt-1">
//           {errors.phone.message}
//         </p>
//       )}
//     </div>
//   );
// }
