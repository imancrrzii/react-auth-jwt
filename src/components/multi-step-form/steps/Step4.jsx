import { CreditCard } from "lucide-react";
import Select from "../../form/Select";
import RadioGroup from "../../form/RadioGroup";
import Input2 from "../../form/Input2";
import Textarea from "../../form/Textarea";
import Checkbox from "../../form/Checkbox";
import { useFormContext } from "react-hook-form";

const Step4 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-sky-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Informasi Tambahan</h2>
      </div>

      <Select
        id="subscription"
        name="subscription"
        labelText="Paket Berlangganan"
        options={[
          { value: "basic", label: "Basic - Gratis" },
          { value: "premium", label: "Premium - Rp 99.000/bulan" },
          { value: "enterprise", label: "Enterprise - Rp 299.000/bulan" }
        ]}
        register={register("subscription", {
          required: "Paket berlangganan wajib dipilih"
        })}
        error={errors.subscription}
      />

      <RadioGroup
        name="paymentMethod"
        labelText="Metode Pembayaran"
        options={[
          { value: "credit_card", label: "Kartu Kredit" },
          { value: "bank_transfer", label: "Transfer Bank" },
          { value: "ewallet", label: "E-Wallet" },
        ]}
        register={register("paymentMethod", {
          required: "Metode pembayaran wajib dipilih"
        })}
        error={errors.paymentMethod}
      />

      <Input2
        id="referral"
        name="referral"
        labelText="Kode Referral (Opsional)"
        placeholder="Masukkan kode referral jika ada"
        register={register("referral")}
        error={errors.referral}
      />

      <Input2
        id="website"
        name="website"
        type="url"
        labelText="Website/Portfolio (Opsional)"
        placeholder="https://www.example.com"
        register={register("website", {
          pattern: {
            value: /^https?:\/\/.+/,
            message: "URL harus diawali dengan http:// atau https://"
          }
        })}
        error={errors.website}
      />

      <Checkbox
        id="terms"
        name="terms"
        labelText="Saya setuju dengan syarat dan ketentuan"
        register={register("terms", {
          required: "Anda harus menyetujui syarat dan ketentuan"
        })}
        error={errors.terms}
      />

      <Checkbox
        id="privacy"
        name="privacy"
        labelText="Saya setuju dengan kebijakan privasi"
        register={register("privacy", {
          required: "Anda harus menyetujui kebijakan privasi"
        })}
        error={errors.privacy}
      />
    </div>
  );
};


export default Step4


// import { useFormContext } from "react-hook-form";
// import Input from "../../Form/Input";

// export default function Step4() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <Input
//         id="address"
//         name="address"
//         labelText="Alamat Lengkap"
//         placeholder="Masukkan alamat lengkap"
//         variantLabel="block mb-2 font-semibold"
//         variant={`w-full border px-3 py-2 rounded focus:outline-none transition ${
//           errors.address ? "border-red-500" : "border-gray-300"
//         } focus:border-sky-500`}
//         aria-invalid={errors.address ? "true" : "false"}
//         aria-describedby="address-error"
//         {...register("address", {
//           required: "Alamat wajib diisi",
//           minLength: {
//             value: 5,
//             message: "Alamat terlalu singkat",
//           },
//         })}
//       />
//       {errors.address && (
//         <p id="address-error" role="alert" className="text-red-500 text-sm mt-1">
//           {errors.address.message}
//         </p>
//       )}
//     </div>
//   );
// }
