import React from "react";
import logo from "../assets/images/sifina-putih.svg";
import login1 from "../assets/images/login-portal-1.svg";
import login2 from "../assets/images/login-portal-2.svg";
import OTPVerificationForm from "./OTPVerificationForm";
import LoginForm from "../components/login/LoginForm";

const LoginPortalPage = () => {
  const isOtpPage = location.pathname === "/verify-otp";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row manrope overflow-hidden">
      {/* LEFT SIDE (Blue background) */}
      <div className="bg-gradient-to-br from-sky-500 to-sky-600 lg:min-h-[110vh] flex-1 p-8 lg:p-16 flex flex-col justify-between relative w-full lg:w-3/5 xl:w-1/2">
        {/* Logo & Descriptions */}
        <div className="flex flex-col gap-6 z-10">
          <img src={logo} alt="Sifina Logo" className="w-32 md:w-44" />
          <div className="text-white">
            <h3 className="text-md font-bold tracking-wide mb-4">
              Portal Sistem Informasi Finansial
            </h3>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-wide leading-10 lg:leading-18 max-w-lg">
              Semua Kebutuhan Transaksi dalam Satu Portal Aplikasi
            </h1>
            <p className="text-md mt-4 max-w-lg font-medium tracking-wide">
              Daftar dan nikmati kemudahan mengelola pembayaran melalui Virtual
              Account dan QRIS dengan lebih praktis, cepat, dan aman hanya di
              Sistem Informasi Finansial SIFina Portal.
            </p>
          </div>
        </div>

        {/* Floating Image */}
        <img
          src={login1}
          alt=""
          className="absolute top-0 -right-10 lg:top-8 lg:-right-16 w-40 lg:w-60"
        />
        <img
          src={login1}
          alt=""
          className="absolute lg:bottom-16 lg:-left-9 w-[100px] lg:w-[120px] pb-12"
        />

        <div className="block lg:hidden mt-12 z-10">
          <div className="bg-white rounded-2xl shadow-lg p-0 lg:p-6 max-w-md mx-auto">
            {isOtpPage ? <OTPVerificationForm /> : <LoginForm />}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-2/5 2xl:w-1/2 bg-white rounded-xl items-center justify-center px-16 py-32 relative">
        <img src={login2} alt="" className="absolute bottom-8 left-0" />
        <div className="mx-auto">
          {isOtpPage ? <OTPVerificationForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginPortalPage;
