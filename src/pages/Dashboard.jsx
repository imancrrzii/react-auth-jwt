import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRekening, setSelectedRekening] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaldo = async () => {
      if (!user?.no_hp || !selectedRekening) {
        setSaldo(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axiosInstance.post("/getsaldo", {
          no_hp: user.no_hp,
          no_rekening: selectedRekening,
        });

        if (response.data.respCode === "0000") {
          setSaldo(response.data.data.saldo);
        } else {
          setError("Gagal mengambil saldo.");
          setSaldo(null);
        }
      } catch (err) {
        console.error("Error fetching saldo:", err);
        setError("Terjadi kesalahan saat mengambil data.");
        setSaldo(null);
        if (
          err.response?.status === 401 ||
          err.message === "Refresh token tidak ditemukan."
        ) {
          clearUser();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user-storage");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (selectedRekening) {
      fetchSaldo();
    } else {
      setSaldo(null);
      setLoading(false);
    }
  }, [selectedRekening, user, clearUser, navigate]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col px-4 mb-6">
        <h1 className="text-2xl font-bold mb-1">
          Selamat datang,{" "}
          <span className="text-sky-600">{user?.nama || "Pengguna"}.</span>
        </h1>
        <p className="text-xs font-bold text-gray-400">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Card Saldo */}
      <div className="bg-white w-full shadow-sm p-5 rounded-4xl text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="flex flex-col gap-8">
            <div className="bg-gradient-to-r from-[#69a1fa] to-[#a08bf7] p-5 shadow w-full sm:w-[300px] rounded-4xl">
              <div className="flex flex-col gap-4">
                <h3 className="text-md font-bold mb-1 text-white uppercase tracking-wide">
                  {user?.nama || "Pengguna"}
                </h3>
                <h6 className="text-sm font-medium text-white">
                  Saldo tersedia
                </h6>
              </div>

              {loading ? (
                <h3 className="text-sm font-bold py-2">Memuat saldo...</h3>
              ) : error ? (
                <h3 className="text-sm font-bold py-2 text-red-300">{error}</h3>
              ) : saldo !== null ? (
                <h3 className="text-sm font-bold py-2">
                  <span style={{ marginRight: "10px" }}>Rp.</span>{" "}
                  <span className="text-xl font-bold">
                    {parseFloat(saldo).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </h3>
              ) : (
                <h3 className="text-sm font-bold py-2">
                  Pilih rekening untuk melihat saldo
                </h3>
              )}

              <h6 className="text-sm font-medium text-white pt-8">
                Rekening: {selectedRekening || "Belum dipilih"}
              </h6>
            </div>
            <div className="mb-6">
              <div className="relative w-full sm:w-[300px]">
                <select
                  value={selectedRekening}
                  onChange={(e) => setSelectedRekening(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2 text-base text-gray-800 bg-gray-100 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500">
                    Pilih Rekening
                  </option>
                  {user?.no_rekening?.map((rek, index) => (
                    <option
                      key={index}
                      value={rek}
                      className="text-gray-800 bg-white hover:bg-blue-100 hover:text-blue-700 py-2 px-4"
                    >
                      {rek}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
