import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUserStore from "../../store/useUserStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:9000/v1/login", {
        no_hp: data.no_hp,
        password: data.password,
      });

      const { respCode, respMessage, data: userData } = response.data;

      if (respCode === "0604") {
        toast.warn(
          respMessage || "Sesi login masih aktif. Silakan coba lagi nanti."
        );
        return; 
      }

      setUser(userData);
      localStorage.setItem("password_temp", data.password);
      navigate("/verify-otp");
    } catch (err) {
      console.error("Login Gagal:", err);
      if (err.response) {
        toast.error(
          err.response.data.message || "ID Pengguna atau Kata Sandi salah."
        );
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
          variant="border-gray-300 focus:border-blue-300 focus:ring-sky-500 focus:ring-1 focus:outline-none placeholder:text-xs bg-white shadow-sm sm:text-sm py-3 w-full px-4 mt-2 mb-4 text-sm rounded-lg border"
          variantLabel={"text-sm font-semibold"}
          placeholder={"Masukkan ID Pengguna"}
        />
        {errors.no_hp && (
          <p className="text-red-500 text-xs mt-1">{errors.no_hp.message}</p>
        )}

        <Input
          type="password"
          id="password"
          labelText="Kata Sandi"
          {...register("password", { required: "Kata Sandi wajib diisi" })}
          variantLabel="text-sm font-semibold"
          placeholder="Masukkan Kata Sandi"
          variant="border-gray-300 focus:border-blue-300 focus:ring-sky-500 focus:ring-1 focus:outline-none placeholder:text-xs bg-white shadow-sm sm:text-sm py-3 w-full px-4 mt-2 text-sm rounded-lg border"
          iconRight={
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        <div className="flex justify-end mb-8 mt-2">
          <Link to={"/"} className="text-sm text-sky-500 hover:text-sky-600">
            Lupa Kata Sandi?
          </Link>
        </div>

        <Button
          type="submit"
          variant="bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 px-4 py-3 w-full rounded-xl font-semibold text-sm cursor-pointer"
          text={isLoading ? "Memuat..." : "Masuk"}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default LoginForm;
