import React from "react";
import { motion } from "framer-motion";
import landingReal from "../../assets/images/landing-image-1.png";
import landingCenter1 from "../../assets/images/landing-image-3.svg";
import landingCenter2 from "../../assets/images/landing-image-2.svg";
import LandingKanan from "../../assets/images/landing-image-4.svg";
import LandingKiri from "../../assets/images/landing-image-5.svg";
import Button from "../ui/Button";
import { HiArrowRight } from "react-icons/hi";

const Hero = () => {
  return (
    <div className="min-h-full">
      <div className="relative bg-white flex flex-col items-center pt-15 md:pt-10 pb-0 lg:pb-32 overflow-hidden">
        {/* Ornamen kiri kanan */}
        <motion.img
          src={LandingKiri}
          alt=""
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 lg:left-5 lg:top-40"
          initial={{ x: 100, opacity: 1 }}
          animate={{ x: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.img
          src={LandingKanan}
          alt=""
          className="absolute right-0 top-0 w-72 md:w-100"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Konten utama */}
        <div className="max-w-[1000px] flex flex-col items-center justify-center text-center gap-6 md:gap-8 px-4 md:px-8 py-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Platform <span className="text-sky-500">SIFina</span>
          </h1>
          <h3 className="text-md font-medium">
            Sesuaikan kebutuhan Anda dan temukan kemudahan dalam mengelola
            keuangan dalam satu platform{" "}
            <span className="font-bold">
              Sistem Informasi Finansial Bank Sumsel Babel
            </span>{" "}
            yang terintegrasi dan mudah diakses kapan saja dan di mana saja.
          </h3>
          <Button
            type="button"
            variant="bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 px-4 py-3 min-w-[100px] w-[250px] rounded-lg font-semibold text-sm cursor-pointer"
            text={
              <div className="flex items-center gap-2 w-full justify-center">
                <p className="w-full text-center text-md font-medium">
                  Jelajah
                </p>
                <HiArrowRight className="w-4 h-4" />
              </div>
            }
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full container mx-auto z-10 mt-8 lg:mt-0">
          <div className="px-12 self-start md:self-auto w-3/4 md:w-auto">
            <motion.img
              src={landingCenter1}
              alt=""
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <div className="pt-4 lg:pt-16 self-end md:self-auto w-3/5 md:w-auto">
            <motion.img
              src={landingCenter2}
              alt=""
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        {/* Gambar landingReal yang menembus */}
        <motion.img
          src={landingReal}
          alt=""
          className="absolute bottom-0 md:bottom-0 left-0 w-full z-20"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default Hero;
