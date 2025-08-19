import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function DeleteWithConfirm({ id, name, onDeleted, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${id}`);
      const data = response.data;

      if (data?.isDeleted) {
        toast.success(
          <span>
            Data <strong>{name}</strong> berhasil dihapus.
          </span>
        );
        if (onDeleted) onDeleted(id);
      } else {
        toast.error("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Gagal delete:", error);
      toast.error("Terjadi kesalahan saat menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
        <p className="mb-6 text-md">
          Apakah Anda yakin ingin menghapus data dengan nama <b>{name}</b>?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm"
          >
            {loading ? "Menghapus..." : "Ya"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded text-sm"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}
