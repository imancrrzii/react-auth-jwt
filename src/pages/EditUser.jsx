import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MultiStepForm from "../components/multi-step-form/MultiStepForm";
import usePageTitle from "../hooks/usePageTitle";

const normalizeDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function EditUser() {
  usePageTitle('Latihan SIFina | Edit Pengguna');
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const normalizedUser = {
          ...data,
          birthDate: normalizeDate(data.birthDate),
          country: data.address?.country || "",
          city: data.address?.city || "",
          address: data.address?.address || "",
        };

        setUserData(normalizedUser);

        console.log(normalizedUser);
        setLoading(false);
      })

      .catch((err) => {
        console.error("Gagal ambil data user:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center h-150">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  if (!userData) return <p>Data tidak ditemukan.</p>;

  return <MultiStepForm initialData={userData} />;
}
