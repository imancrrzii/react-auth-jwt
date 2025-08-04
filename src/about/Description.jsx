import React from "react";
import gelembung2 from "../assets/images/about-top-right.svg";
import about from "../assets/images/about.png";

const Description = () => {
  return (
    <div className="py-4 container mx-auto px-4 lg:px-0">
      <div className="bg-[#e0f3ff] border-0 rounded-4xl flex flex-col-reverse lg:flex-row relative justify-between">
        <img src={gelembung2} alt="" className="absolute top-0 right-0" />
        <div className="self-start lg:w-1/3 pt-12">
          <img src={about} alt="" className="w-full rounded-4xl" />
        </div>
        <div className="lg:w-2/3 px-12 lg:px-24 py-20 lg:py-24 z-10">
          <div className="flex flex-col gap-2">
            <h3 className="lg:w-[500px] text-3xl lg:text-4xl font-bold tracking-wide lg:leading-14">
              Apa itu SIFina <br />
              Bank Sumsel Babel ?
            </h3>
            <p className="text-md font-normal leading-6">
              Sistem Informasi Finansial atau disingkat SIFina merupakan sebuah
              platform digital berbasis website yang menyediakan informasi
              mengenai data keuangan nasabah Bank Sumsel Babel, berupa data
              rekening dan aktivitas perbankan serta menyediakan layanan
              transaksi yang dikemas dalam satu ekosistem dengan dilengkapi
              metode keamanan authentikasi dua faktor/ Two Factor Authentication
              (2FA) melalui penerapan kode OTP (One-Time Password).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
