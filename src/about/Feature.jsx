import React from "react";
import { FaBook, FaBookOpen, FaSearch, FaWallet } from "react-icons/fa";
import {
  FaArrowRightArrowLeft,
  FaClockRotateLeft,
  FaMoneyBill,
} from "react-icons/fa6";
import { RiWalletFill } from "react-icons/ri";

const Feature = () => {
  return (
    <div className="bg-gray-50 py-16">
      <h3 className="font-bold text-2xl lg:text-4xl text-center mb-12">
        Fitur yang Kami Sediakan
      </h3>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-16 mb-0 lg:mb-12 px-4 lg:px-0">
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[280px] rounded-4xl shadow-sm items-start">
          <FaWallet className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Informasi Saldo Rekening</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            Informasi saldo rekening yang di tampil akan dapat multi rekening
            sesuai dengan wewenang akses rekening terdaftar pada akun.
          </p>
          <div className="flex md:flow-row mt-1 items-center">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-600 rounded-full text-xs py-1 px-2 text-white">
              SIFina Dashboard
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[275px] rounded-4xl shadow-sm">
          <FaClockRotateLeft className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Mutasi Rekening</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            Riwayat transaksi rekening dapat diakses dan dilakukan cetak dengan
            format PDF dan Excel.
          </p>
          <div className="flex md:flow-row mt-1 items-center">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-600 rounded-full text-xs py-1 px-2 text-white">
              SIFina Dashboard
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[275px] rounded-4xl shadow-sm">
          <FaArrowRightArrowLeft className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Informasi Transaksi</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            SIFina dapat menampilkan semua data transaksi yang dilakukan melalui
            QRIS dan Virtual Account berdasarkan kode merchant dan Provider
            terdaftar.
          </p>
          <div className="flex md:flow-row mt-1 items-center grow">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-600 rounded-full text-xs py-1 px-2 text-white">
              SIFina Dashboard
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 mt-8 lg:mt-0 px-4 lg:px-0">
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[275px] rounded-4xl shadow-sm">
          <FaMoneyBill className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Proses Pembayaran</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            SIFina menyediakan fitur buat Nomor Virtual Account atau Kode QRIS
            agar memudahkan Anda dalam bertransaksi.
          </p>
          <div className="flex md:flow-row mt-1 items-center grow">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-500 rounded-full text-xs py-1 px-2 text-white">
              SIFina Portal
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[275px] rounded-4xl shadow-sm">
          <FaSearch className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Periksa Status Pembayaran</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            Pantau status pembayaran yang dilakukan melalui Virtual Account
            ataupun QRIS.
          </p>
          <div className="flex md:flow-row mt-1 items-center grow">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-500 rounded-full text-xs py-1 px-2 text-white">
              SIFina Portal
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white border-1 border-gray-100 px-6 py-10 w-full lg:w-[275px] rounded-4xl shadow-sm">
          <FaBookOpen className="w-7 h-7 text-sky-500" />
          <h3 className="text-sm font-bold">Laporan Transaksi</h3>
          <p className="text-sm font-normal h-[100px] tracking-wide">
            Fitur akses dan cetak daftar transaksi yang dibayar menggunakan QRIS
            dan VIrtual Account yang dibuat pada Aplikasi SIFina.
          </p>
          <div className="flex md:flow-row mt-1 items-center grow">
            <p className="text-sm font-normal me-1">Fitur tersedia di:</p>
            <div className="bg-sky-500 rounded-full text-xs py-1 px-2 text-white">
              SIFina Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
