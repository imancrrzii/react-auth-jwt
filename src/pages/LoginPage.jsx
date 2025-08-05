import { useEffect } from "react";
import LoginForm from "../components/login/LoginForm";
import login1 from "../assets/images/login-1.png";
import login2 from "../assets/images/login-2.png";
import login3 from "../assets/images/login-3.png";
import login4 from "../assets/images/login-4.png";
import { useLocation } from "react-router-dom";
import OTPVerificationForm from "./OTPVerificationForm";
import { toast } from "react-toastify";

const LoginPage = () => {
  const location = useLocation();
  useEffect(() => {
    const logoutMessage = sessionStorage.getItem("logout_message");
    if (logoutMessage) {
      toast.error(logoutMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      sessionStorage.removeItem("logout_message");
    }
  }, []);

  return (
    <div className="pt-8 container mx-auto">
      <div className="flex px-4 sm:px-10 md:px-20 mb-2 justify-around max-w-screen-2xl flex-col lg:flex-row gap-8">
        <div className="pl-8 py-2 max-sm:px-3 max-xl:px-5 flex-1">
          <div className="flex flex-col gap-3">
            <div className="mb-4">
              <label className="text-xs font-bold text-sky-400">
                Berdedikasi untuk Daerah
              </label>
            </div>

            <h1 className="text-2xl font-bold text-wrap">
              Sistem Informasi Finansial ( SIFina )
              <br className="max-sm:hidden" />
              <span className="font-bold text-sky-500"> Bank Sumsel Babel</span>
            </h1>

            <div className="max-w-[700px] mt-3">
              <h3 className="text-sm lg:text-lg font-medium text-black">
                Kami hadir menyediakan informasi keuangan nasabah Bank Sumsel
                Babel dengan data yang terintegrasi secara real-time dan
                terlindung.
              </h3>
            </div>

            <div className="relative mt-5 w-full h-auto overflow-hidden">
              <img
                src={login1}
                alt="Gambar utama"
                className="w-full h-auto block"
              />

              <img
                src={login2}
                alt="Ikon kiri atas"
                className="absolute top-0 xl:top-4 xl:left-1 w-6 md:w-8 xl:w-12 animate-glow z-50"
              />
              <img
                src={login3}
                alt="Ikon kanan atas"
                className="absolute top-1 right-4 xl:right-12 w-10 md:w-12 lg:w-12 xl:w-18 animate-bounceDown"
              />
              <img
                src={login4}
                alt="Ikon kiri bawah"
                className="absolute left-4 xl:left-16 top-1/2 transform -translate-y-1/2 w-10 md:w-12 lg:w-12 xl:w-18 animate-bounceDown"
              />
            </div>
          </div>
        </div>
        <div className="pt-2 pr-0 lg:pt-16 lg:pr-8 flex-shrink-0">
          {location.pathname === "/verify-otp" ? (
            <OTPVerificationForm />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
