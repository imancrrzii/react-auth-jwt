import { useState } from "react";
import Button from "../form/Button";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUserStore from "../../store/useUserStore";
import { toast } from "react-toastify";
import { encryptData } from "../../utils/tokenCrypto";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../Form/Input";
import axiosInstance from "../../utils/axiosInstance";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/login", {
        no_hp: data.no_hp,
        password: data.password,
      });

      const { respCode, respMessage, data: userData } = response.data;

      if (respCode === "0604") {
        toast.warn(
          respMessage || "Sesi login masih aktif. Silakan coba lagi nanti."
        );
        return;
      } else if (respCode === "0603") {
        toast.error(
          respMessage ||
            "Pengguna tidak ditemukan. Periksa kembali nomor HP Anda."
        );
        return;
      }

      setUser(userData);
      localStorage.setItem("password_temp", encryptData(data.password));
      navigate("/verify-otp");
    } catch (err) {
      console.error("Login Gagal:", err);

      if (err.response) {
        const { respCode, respMessage } = err.response.data;

        // 🟡 Mapping error ke field tertentu
        if (respCode === "0800") {
          setError("no_hp", {
            type: "manual",
            message: respMessage || "Nomor HP tidak valid",
          });
        } else if (respCode === "0801") {
          setError("password", {
            type: "manual",
            message: respMessage || "Password tidak valid",
          });
        } else {
          toast.error(respMessage || "Terjadi kesalahan saat login.");
        }
      } else if (err.request) {
        toast.error(
          "Tidak ada respons dari server. Periksa koneksi internet Anda."
        );
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl border-gray-300 lg:w-[413px] py-12 px-8 max-lg:w-full max-sm:p-5 max-sm:mb-20">
      <div className="flex flex-col gap-8 mb-6">
        <img src={logo} alt="" className="w-40 md:w-50" />
        <h1 className="text-xl font-bold">Silahkan Login ke Aplikasi</h1>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          labelText="ID Pengguna"
          id="no_hp"
          {...register("no_hp", { required: "ID Pengguna wajib diisi" })}
          variant={`${
            errors.no_hp
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-300 focus:ring-sky-500"
          } focus:ring-1 focus:outline-none placeholder:text-xs bg-white shadow-sm sm:text-sm py-3 w-full px-4 mt-2 text-sm rounded-lg border`}
          variantLabel={"text-sm font-semibold"}
          placeholder={"Masukkan ID Pengguna"}
        />
        {errors.no_hp && (
          <p className="text-red-500 text-xs mt-2">{errors.no_hp.message}</p>
        )}

        <div className="mt-4">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            labelText="Kata Sandi"
            {...register("password", { required: "Kata Sandi wajib diisi" })}
            variantLabel="text-sm font-semibold"
            placeholder="Masukkan Kata Sandi"
            variant={`${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-300 focus:ring-sky-500"
            } focus:ring-1 focus:outline-none placeholder:text-xs bg-white shadow-sm sm:text-sm py-3 w-full px-4 mt-2 text-sm rounded-lg border`}
            iconRight={
              <div
                onClick={togglePasswordVisibility}
                className="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-2"
              >
                {/* Ganti dengan React Icons */}
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" />
                )}
              </div>
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end mb-8 mt-2">
          <Link to={"/"} className="text-sm text-sky-500 hover:text-sky-600">
            Lupa Kata Sandi?
          </Link>
        </div>

        <Button
          type="submit"
          variant="bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 px-4 py-3 w-full rounded-lg font-semibold text-sm cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <ClipLoader color="#ffffff" size={20} />
              <span>Memuat...</span>
            </div>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;