import gelembung from "../../assets/images/gelembung-1.svg";
import portal from "../../assets/images/sifina-portal-1.png";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";
import gambar5 from "../../assets/images/games/7.png";
import gambar6 from "../../assets/images/games/5.png";

const Feature = () => {
  return (
    <div className="bg-white relative min-h-[600px] py-12">
      <div className="flex flex-col items-center overflow-visible relative">
        <img
          src={gambar5}
          alt=""
          className="absolute -top-16 right-36 w-32 h-32 max-md:hidden"
        />
        <img
          src={gambar6}
          alt=""
          className="absolute -top-16 left-36 w-32 h-32 max-md:hidden"
        />
        <div className="flex flex-col w-full justify-center items-center">
          <div className="text-center">
            <h3
              className="text-xl lg:text-3xl font-bold max-w-lg text-center lg:leading-tight text-gray-900 drop-shadow-lg"
              style={{
                textShadow:
                  "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
              }}
            >
              Why Traditional Hiring Processes Are Holding You Back
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
