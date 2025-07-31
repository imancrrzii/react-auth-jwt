import React from "react";
import gelembung from "../../assets/images/gelembung-1.svg";
import portal from "../../assets/images/sifina-portal-1.png";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const SifinaPortal = () => {
  return (
    <div className="bg-white relative min-h-[600px] py-12">
      <div className="flex flex-col lg:flex-row justify-between items-center overflow-visible relative">
        <img
          src={gelembung}
          alt=""
          className="absolute -top-72 z-10 w-full max-md:hidden"
        />
        <div className="flex flex-col lg:flex-row w-full">
          <div className="self-start px-8 lg:pr-16 lg:pl-24 lg:w-5/8 ">
            <div className="flex flex-col gap-8">
              <h3 className="text-3xl lg:text-4xl font-bold tracking-wide">
                <div>Portal</div>
                <div className="mt-4">
                  Transaksi <span className="text-sky-500">SIFina</span>
                </div>
              </h3>
              <p>
                Kami menawarkan Solusi Pembayaran Modern: QRIS & Virtual Account
                dalam Satu Platform melalui Portal Transaksi SIFina. Dirancang
                untuk memberikan kenyamanan dan fleksibilitas, platform kami
                memastikan bahwa Anda dapat memproses setiap transaksi dengan
                lebih mudah dan aman.
              </p>
              <div className="flex flex-col gap-2 item-center py-2">
                <div className="flex px-4 font-bold items-center">
                  <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                    <IoMdCheckmark className="w-4 h-4" />
                  </label>
                  <p>Informasi Saldo multi rekening secara Real-Time</p>
                </div>
                <div className="flex px-4 font-bold items-center">
                  <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                    <IoMdCheckmark className="w-4 h-4" />
                  </label>
                  <p>Laporan Mutasi Rekening Terperinci</p>
                </div>
                <div className="flex px-4 font-bold items-center">
                  <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                    <IoMdCheckmark className="w-4 h-4" />
                  </label>
                  <p>Laporan Transaksi QRIS dan Virtual Account</p>
                </div>
              </div>
              <Link
                to={"/login"}
                className="   
            px-4 py-3 
            rounded-lg 
            text-white 
            hover:opacity-90
            font-normal
            text-sm	
            min-w-[100px]
            shadow-md w-[250px] mt-4 hover:bg-sky-600 z-10 bg-sky-500 
            "
              >
                <div className="flex items-center gap-2">
                  <p className="w-full text-center font-semibold cursor-pointer">
                    Masuk Aplikasi
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="self-end lg:w-2/5 py-12">
            <img src={portal} alt="" className="w-65 lg:w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SifinaPortal;
