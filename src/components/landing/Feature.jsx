import React from "react";
import fitur1 from "../../assets/images/fitur-1.svg";
import fitur2 from "../../assets/images/fitur-2.svg";
import fitur3 from "../../assets/images/fitur-3.svg";
import fitur4 from "../../assets/images/fitur-4.svg";
import fitur5 from "../../assets/images/fitur-5.svg";

const Feature = () => {
  return (
    <div>
      <div className="bg-[#e0f5fe] py-16 relative border-dashed border-b-[14px] border-white">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center gap-2 mb-8 lg:mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-wide">
              Fitur <span className="text-sky-500">Unggulan</span>{" "}
            </h3>
            <p className="font-medium text-md lg:text-xl text-center md:text-start">
              Temukan fitur unggulan kami yang akan mempermudah bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 gap-8 pb-8 pt-2 items-start">
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={fitur1} alt="" className="w-16 lg:w-20" />
              <h6 className="font-bold text-md">Informasi Rekening</h6>
              <p className="text-center">
                Pantau saldo multi rekening kelolaan Anda secara terpusat dalam
                satu akun.
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={fitur2} alt="" className="w-16 lg:w-20" />
              <h6 className="font-bold text-md">Mutasi Rekening</h6>
              <p className="text-center">
                Akses dan Cetak laporan riwayat transaksi dari berbagai rekening
                terdaftar
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={fitur3} alt="" className="w-16 lg:w-20" />
              <h6 className="font-bold text-md">QRIS Dinamis</h6>
              <p className="text-center">
                Terima pembayaran lebih praktis dengan QRIS, tinggal scan dan
                langsng bayar.
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={fitur4} alt="" className="w-16 lg:w-20" />
              <h6 className="font-bold text-md">Virtual Account</h6>
              <p className="text-center">
                Transaksi lebih aman dan mudah dengan pembayaran Virtual Account
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center col-span-2 sm:col-span-1 lg:col-span-1 sm:justify-self-center">
              <img src={fitur5} alt="" className="w-16 lg:w-20" />
              <h6 className="font-bold text-md">Laporan</h6>
              <p className="text-center w-1/2 lg:w-full">
                Akses dan kelola laporan transaksi pembayaran QRIS ataupun
                Virtual Account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
