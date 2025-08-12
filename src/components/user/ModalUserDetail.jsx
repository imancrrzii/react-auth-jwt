import { X } from "lucide-react";

const ModalUserDetail = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-bold mb-4">Detail Pengguna</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>ID:</strong> {user.id}
          </div>
          <div>
            <strong>Nama:</strong> {user.firstName} {user.lastName}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Telepon:</strong> {user.phone}
          </div>
          <div>
            <strong>Usia:</strong> {user.age}
          </div>
          <div>
            <strong>Gender:</strong> {user.gender}
          </div>
          <div>
            <strong>Tanggal Lahir:</strong>{" "}
            {new Date(user.birthDate).toLocaleDateString("id-ID")}
          </div>
          <div>
            <strong>Golongan Darah:</strong> {user.bloodGroup}
          </div>
          <div>
            <strong>Tinggi:</strong> {user.height} cm
          </div>
          <div>
            <strong>Berat:</strong> {user.weight} kg
          </div>
          <div>
            <strong>Warna Mata:</strong> {user.eyeColor}
          </div>
          <div>
            <strong>Warna Rambut:</strong> {user.hair?.color}
          </div>
          <div>
            <strong>Perusahaan:</strong> {user.company?.name}
          </div>
          <div>
            <strong>Jabatan:</strong> {user.company?.title}
          </div>
          <div>
            <strong>Departemen:</strong> {user.company?.department}
          </div>
          <div>
            <strong>Alamat:</strong> {user.address?.address}
          </div>
          <div>
            <strong>Kota:</strong> {user.address?.city}
          </div>
          <div>
            <strong>Negara Bagian:</strong> {user.address?.state}
          </div>
          <div>
            <strong>Kode Pos:</strong> {user.address?.postalCode}
          </div>
          <div>
            <strong>Universitas:</strong> {user.university}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserDetail;
