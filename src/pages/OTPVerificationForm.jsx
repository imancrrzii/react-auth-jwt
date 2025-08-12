import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/images/notif.svg";
import { HiArrowLeft } from "react-icons/hi";
import useUserStore from "../store/useUserStore";
import { encryptToken } from "../utils/tokenCrypto";
import { decryptData } from "../utils/tokenCrypto";
import Input from "../components/Form/Input";
import axiosInstance from "../utils/axiosInstance";

const OTPVerificationForm = () => {
  const user = useUserStore((state) => state.user);
  const [isFirstResend, setIsFirstResend] = useState(true); // untuk deteksi pengiriman pertama

  const navigate = useNavigate();
  const no_hp = user?.no_hp || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef(null);

  const COUNTDOWN_DURATION = 10;

  useEffect(() => {
    const savedStartTime = localStorage.getItem(`otp_start_time_${no_hp}`);
    const currentTime = Date.now();

    if (savedStartTime) {
      const elapsedTime = Math.floor(
        (currentTime - parseInt(savedStartTime)) / 1000
      );
      const remainingTime = COUNTDOWN_DURATION - elapsedTime;

      if (remainingTime > 0) {
        setCountdown(remainingTime);
      } else {
        setCountdown(0);
        localStorage.removeItem(`otp_start_time_${no_hp}`);
      }
    } else {
      startCountdown();
    }
  }, [no_hp]);

  useEffect(() => {
    if (countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem(`otp_start_time_${no_hp}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdown, no_hp]);

  const startCountdown = () => {
    const startTime = Date.now();
    localStorage.setItem(`otp_start_time_${no_hp}`, startTime.toString());
    setCountdown(COUNTDOWN_DURATION);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [no_hp, navigate]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && !isLoading && !hasSubmitted) {
      handleSubmitOtp(otp.join(""));
    }
  }, [otp, isLoading, hasSubmitted]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (hasSubmitted) {
      setHasSubmitted(false);
      setError(null);
    }

    if (value !== "" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];

      if (otp[index] === "") {
        if (index > 0 && inputRefs.current[index - 1]) {
          newOtp[index - 1] = "";
          inputRefs.current[index - 1].focus();
        }
      } else {
        newOtp[index] = "";
      }

      setOtp(newOtp);
    }
  };

  const handleSubmitOtp = async (fullOtp) => {
    setIsLoading(true);
    setError(null);
    setHasSubmitted(true);

    try {
      const response = await axiosInstance.post("/verify-otp", {
        no_hp,
        otp: fullOtp,
      });

      const { access_token, refresh_token } = response.data.data;

      if (
        response.status === 200 &&
        (response.data.respCode === "0000" ||
          response.data.resp_code === "0000")
      ) {
        localStorage.removeItem(`otp_start_time_${no_hp}`);
        localStorage.removeItem("password_temp");
        localStorage.setItem("access_token", encryptToken(access_token));
        localStorage.setItem("refresh_token", encryptToken(refresh_token));
        navigate("/dashboard");
      } else {
        setOtp(new Array(6).fill(""));
        setHasSubmitted(false);
        setError(
          response.data.respMessage ||
            response.data.resp_message ||
            "Kode OTP salah atau telah kadaluarsa."
        );
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (err) {
      setOtp(new Array(6).fill(""));
      setHasSubmitted(false);

      if (err.response && err.response.data) {
        if (
          err.response.data.respCode === "0000" ||
          err.response.data.resp_code === "0000"
        ) {
          localStorage.removeItem(`otp_start_time_${no_hp}`);
          localStorage.setItem(
            "access_token",
            encryptToken(resp.data.access_token)
          );
          localStorage.setItem(
            "refresh_token",
            encryptToken(resp.data.refresh_token)
          );
          navigate("/dashboard");
          return;
        }

        setError(
          err.response.data.respMessage ||
            err.response.data.resp_message ||
            err.response.data.message ||
            "Terjadi kesalahan pada server saat verifikasi OTP."
        );
      } else if (err.request) {
        setError(
          "Tidak ada respons dari server. Periksa koneksi internet Anda."
        );
      } else {
        setError("Terjadi kesalahan saat verifikasi OTP. Silakan coba lagi.");
      }

      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const password = decryptData(localStorage.getItem("password_temp"));

    let no_hp = null;

    try {
      const encryptedRoot = localStorage.getItem("persist:root");

      if (!encryptedRoot) throw new Error("Data persist:root tidak ditemukan");

      const decryptedRoot = decryptData(encryptedRoot);

      const noHpFromState = decryptedRoot?.state?.user?.no_hp;

      no_hp = noHpFromState;
    } catch (err) {
      console.error("Gagal parsing localStorage:", err);
      alert("Terjadi kesalahan saat membaca data pengguna.");
      return;
    }

    if (!no_hp || !password) {
      alert("Nomor HP atau password tidak ditemukan.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:9000/v1/resend-otp",
        {
          no_hp,
          password,
        }
      );

      if (response.data.respCode === "0000") {
        alert("Kode OTP berhasil dikirim ulang.");

        if (!isFirstResend) {
          setCountdown(30);
        }

        setIsFirstResend(false);
      } else {
        alert(response.data.respMessage || "Gagal mengirim ulang OTP.");
      }
    } catch (error) {
      console.error("Gagal mengirim ulang OTP:", error);
      alert("Terjadi kesalahan saat mengirim ulang OTP.");
    }
  };

  return (
    <div className="border rounded-2xl border-gray-300 w-[413px] p-4 max-lg:w-full mb-4 lg:mb-8">
      <div className="flex flex-col gap-8 mb-6">
        <Link
          to={"/login"}
          className="flex border-gray-100 border-1 shadow-sm rounded-md w-10 h-10 items-center justify-center p-1"
        >
          <HiArrowLeft className="text-md cursor-pointer" />
        </Link>

        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-bold">Verifikasi OTP</h1>
          <img src={image} alt="Notification icon" className="w-40 md:w-50" />
          <p className="text-sm text-gray-600 text-center">
            Masukkan 6 digit kode OTP yang dikirimkan ke nomor handphone{" "}
            <b>{no_hp}</b>
          </p>
        </div>
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

      <div className="flex justify-center items-center gap-4 mb-16">
        {otp.map((data, index) => (
          <Input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isLoading}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 justify-center items-center text-center my-8">
        <p className="text-sm text-gray-400">
          Tidak menerima kode OTP? Anda dapat melakukan{" "}
          <span>
            <button
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`font-bold underline ${
                countdown > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-sky-600 hover:text-sky-700"
              }`}
            >
              Kirim Ulang
            </button>
            {countdown > 0 && <span> dalam {formatTime(countdown)}</span>}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
