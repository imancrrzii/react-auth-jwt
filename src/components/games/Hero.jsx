import { ArrowRight, Guitar } from "lucide-react";
import gambar1 from "../../assets/images/games/12.png";
import gambar2 from "../../assets/images/games/13.png";
import gambar3 from "../../assets/images/games/14.png";
import gambar4 from "../../assets/images/games/15.png";
// import gambar5 from "../../assets/images/games/7.png";
// import gambar6 from "../../assets/images/games/5.png";

const Hero = () => {
  return (
    <div className="px-8 sm:px-4 py-12 bg-white relative overflow-hidden">
      {/* Background Layer - dengan z-index rendah */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={gambar1}
          alt=""
          className="absolute top-8 left-4 lg:top-20 lg:left-15 w-12 h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 animate-bounce opacity-80 transition-all duration-300"
          style={{ animationDuration: "3s" }}
        />
        <img
          src={gambar2}
          alt=""
          className="absolute top-4 right-4 lg:top-5 lg:right-15 w-12 h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 opacity-80 transition-all duration-300"
        />
        <img
          src={gambar3}
          alt=""
          className="absolute bottom-20 right-4 sm:bottom-30 sm:right-35 w-18 h-18 lg:w-24 lg:h-24 opacity-80"
        />
        <img
          src={gambar4}
          alt=""
          className="absolute bottom-20 left-4 sm:bottom-30 sm:left-35 w-18 h-18 lg:w-24 lg:h-24 opacity-80"
        />
        {/* <img
          src={gambar5}
          alt=""
          className="absolute -bottom-10 left-35 w-18 h-18 opacity-80"
        />
        <img
          src={gambar6}
          alt=""
          className="absolute -bottom-10 right-35 w-18 h-18 opacity-80"
        /> */}
        {/* Blur backgrounds dengan opacity lebih rendah */}
        <div className="absolute top-10 left-5 w-128 h-60 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-10 right-5 w-128 h-60 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-25"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
        {/* Badge dengan text shadow untuk kontras */}
        <div className="bg-white px-3 py-1 border-1 border-gray-100 shadow-xs rounded-full flex gap-1 items-center relative z-20">
          <small className="text-xs text-sky-600 font-bold drop-shadow-xs">
            Intelligent Hiring Process Automation
          </small>
          <span>
            <ArrowRight className="w-3 h-3 text-sky-600 drop-shadow-sm" />
          </span>
        </div>

        {/* Title dengan text shadow yang kuat */}
        <div className="relative z-20">
          <h1
            className="text-3xl lg:text-5xl font-black max-w-4xl text-center lg:leading-tight text-gray-900 drop-shadow-lg"
            style={{
              textShadow:
                "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
            }}
          >
            Revolutionize Your Hiring Process with AI-Powered Solutions
          </h1>
        </div>

        {/* Description dengan text shadow */}
        <div className="relative z-20">
          <p
            className="text-sm font-medium max-w-sm text-center text-gray-800 drop-shadow-md"
            style={{
              textShadow:
                "1px 1px 2px rgba(255,255,255,0.9), -0.5px -0.5px 1px rgba(255,255,255,0.9)",
            }}
          >
            Automate candidate screening, scheduling, and assesment with AI to
            hire faster, smarter, and fairer
          </p>
        </div>

        {/* Avatar section */}
        <div className="relative z-20 flex items-center">
          {/* Avatar Stack */}
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="User 1"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face"
              alt="User 2"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="User 3"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
              alt="User 4"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-lg"
            />
          </div>
          <span
            className="ml-3 text-xs font-bold text-gray-900 drop-shadow-sm"
            style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}
          >
            Trusted already by 1.3k+
          </span>
        </div>

        {/* Button section */}
        <div className="relative z-20 flex flex-col md:flex-row gap-2 mt-2">
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-xs rounded-full text-white font-semibold cursor-pointer flex items-center gap-1 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Request Demo{" "}
              <span>
                <Guitar className="w-3 h-3" />
              </span>
            </button>
          </div>
          <button className="bg-white text-gray-900 font-bold px-5 py-2 text-xs rounded-full border-2 border-gray-900 cursor-pointer hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
