import { User } from "lucide-react";
import Input2 from "../../form/Input2";
import RadioGroup from "../../form/RadioGroup";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-sky-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Informasi Personal</h2>
      </div>

      <Input2
        id="firstName"
        name="firstName"
        labelText="Nama Depan"
        placeholder="Masukkan nama depan"
        register={register("firstName", {
          required: "Nama depan wajib diisi",
          minLength: { value: 2, message: "Minimal 2 karakter" }
        })}
        error={errors.firstName}
      />

      <Input2
        id="lastName"
        name="lastName"
        labelText="Nama Belakang"
        placeholder="Masukkan nama belakang"
        register={register("lastName", {
          required: "Nama belakang wajib diisi",
          minLength: { value: 2, message: "Minimal 2 karakter" }
        })}
        error={errors.lastName}
      />

      <Input2
        id="birthDate"
        name="birthDate"
        type="date"
        labelText="Tanggal Lahir"
        register={register("birthDate", {
          required: "Tanggal lahir wajib diisi"
        })}
        error={errors.birthDate}
      />

      <RadioGroup
        name="gender"
        labelText="Jenis Kelamin"
        options={[
          { value: "male", label: "Laki-laki" },
          { value: "female", label: "Perempuan" }
        ]}
        register={register("gender", {
          required: "Jenis kelamin wajib dipilih"
        })}
        error={errors.gender}
      />
    </div>
  );
};

export default Step1;

// import { useFormContext } from "react-hook-form";
// import Input from "../../Form/Input";


// export default function Step1() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <Input
//         id="name"
//         name="name"
//         labelText="Nama Lengkap"
//         variantLabel="block mb-2 font-semibold"
//         placeholder="Masukkan nama lengkap"
//         variant={`w-full border px-3 py-2 rounded focus:outline-none transition ${
//           errors.name ? "border-red-500" : "border-gray-300"
//         } focus:border-sky-500`}
//         aria-invalid={errors.name ? "true" : "false"}
//         aria-describedby="name-error"
//         {...register("name", {
//           required: "Nama wajib diisi",
//           minLength: {
//             value: 3,
//             message: "Nama minimal 3 karakter",
//           },
//           pattern: {
//             value: /^[A-Za-z\s]+$/i,
//             message: "Nama hanya boleh huruf dan spasi",
//           },
//         })}
//       />

//       {errors.name && (
//         <p id="name-error" role="alert" className="text-red-500 text-sm mt-1">
//           {errors.name.message}
//         </p>
//       )}
//     </div>
//   );
// }
