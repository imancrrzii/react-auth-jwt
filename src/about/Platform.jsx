import React from "react";
import digital from "../assets/images/bg-about-fitur.png";
import fitur1 from "../assets/images/fitur-1.svg";
import fitur2 from "../assets/images/fitur-2.svg";
import fitur3 from "../assets/images/fitur-3.svg";
import fitur4 from "../assets/images/fitur-4.svg";
import fitur5 from "../assets/images/fitur-5.svg";

const Platform = () => {
  return (
    <div className="bg-white py-16 relative">
      <div className="text-center px-8 lg:px-0">
        <h3 className="font-bold text-2xl lg:text-4xl tracking-wide">
          Platform Digital <span className="text-sky-500">SIFina</span>
        </h3>
        <p className="text-md lg:text-xl font-medium tracking-wide mt-2">
          Sesuaikan Kebutuhan Anda melalui Layanan yang Kami Tawarkan
        </p>
      </div>
      <img src={digital} alt="" className="absolute z-0" />
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-42 py-16 lg:py-40 ">
        <img
          src={fitur1}
          alt=""
          className="z-10 w-[8vw] max-w-24 animate-float"
        />
        <img
          src={fitur2}
          alt=""
          className="z-10 w-[10vw] max-w-28 animate-float-slow"
        />
        <img
          src={fitur3}
          alt=""
          className="z-10 w-[7vw] max-w-20 animate-float-fast"
        />
        <img
          src={fitur4}
          alt=""
          className="z-10 w-[9vw] max-w-24 animate-float-delay"
        />
        <img
          src={fitur5}
          alt=""
          className="z-10 w-[6vw] max-w-20 animate-float-offset"
        />
      </div>
    </div>
  );
};

export default Platform;
