import { useFormContext } from "react-hook-form";
import { useState } from "react";
import Input2 from "../../form/Input2";
import Textarea from "../../form/Textarea";
import RadioGroup from "../../form/RadioGroup";
import Select from "../../form/Select";
import Checkbox from "../../form/Checkbox";

const Step1 = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [showCustomFields, setShowCustomFields] = useState(false);

  const pilihanInstitusi = watch("pilihanInstitusi");

  const handleCheckboxChange = (e) => {
    setShowCustomFields(e.target.checked);

    if (e.target.checked) {
      setValue("pilihanInstitusi", "");
    }
  };

  return (
    <div className="space-y-4">
      {/* Select Institusi */}
      <Select
        id="pilihanInstitusi"
        name="pilihanInstitusi"
        labelText="Pilih Institusi"
        options={[
          { value: "universitas_a", label: "Universitas A - Padang" },
          { value: "universitas_b", label: "Universitas B - Palembang" },
          { value: "universitas_c", label: "Universitas C - Bogor" },
        ]}
        register={register("pilihanInstitusi", {
          validate: (val) => {
            const isCustom = watch("noInstitution");
            const customUni = watch("customInstitution.universitas");
            const customKota = watch("customInstitution.kota_universitas");

            if (!val && !isCustom) {
              return "Institusi wajib dipilih atau isi data institusi baru";
            }

            if (isCustom && (!customUni || !customKota)) {
              return "Harap lengkapi data institusi";
            }

            return true;
          },
        })}
        error={errors.pilihanInstitusi}
        disabled={showCustomFields} 
      />

      {/* Checkbox */}
      <Checkbox
        id="noInstitution"
        name="noInstitution"
        labelText="Tidak ada data yang Anda inginkan?"
        register={register("noInstitution")}
        onChange={handleCheckboxChange}
        disabled={!!pilihanInstitusi} 
      />

      {showCustomFields && (
        <div className="border border-gray-200 p-4 rounded-md space-y-4 bg-gray-50">
          <Input2
            id="customInstitution.universitas"
            name="customInstitution.universitas"
            labelText="Nama Institusi"
            placeholder="Masukkan nama institusi"
            register={register("customInstitution.universitas")}
            error={errors?.customInstitution?.universitas}
          />
          <Input2
            id="customInstitution.kota_universitas"
            name="customInstitution.kota_universitas"
            labelText="Kota Institusi"
            placeholder="Masukkan kota institusi"
            register={register("customInstitution.kota_universitas")}
            error={errors?.customInstitution?.kota_universitas}
          />
        </div>
      )}

      <Input2
        id="firstName"
        name="firstName"
        labelText="Nama Depan"
        placeholder="Masukkan nama depan"
        register={register("firstName", {
          required: "Nama depan wajib diisi",
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
        })}
        error={errors.lastName}
      />

      <RadioGroup
        name="gender"
        labelText="Jenis Kelamin"
        options={[
          { value: "male", label: "Laki-laki" },
          { value: "female", label: "Perempuan" },
        ]}
        register={register("gender", {
          required: "Jenis kelamin wajib dipilih",
        })}
        error={errors.gender}
      />

      <Textarea
        id="address"
        name="address"
        labelText="Alamat Lengkap"
        placeholder="Masukkan alamat lengkap Anda"
        register={register("address", {
          required: "Alamat wajib diisi",
        })}
        error={errors.address}
      />
    </div>
  );
};

export default Step1;
