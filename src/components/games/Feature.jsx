import gambar5 from "../../assets/images/games/7.png";
import gambar6 from "../../assets/images/games/5.png";
import {
  ArrowUpRight,
  BookCopy,
  LandPlot,
  MonitorCheck,
  Ribbon,
  Ship,
} from "lucide-react";

const Feature = () => {
  return (
    <div className="w-full bg-white relative p-2 lg:p-12">
      <div className="flex flex-col items-center overflow-visible relative">
        <img
          src={gambar5}
          alt=""
          className="absolute -top-16 right-28 w-32 h-32 max-lg:hidden"
        />
        <img
          src={gambar6}
          alt=""
          className="absolute -top-16 left-28 w-32 h-32 max-lg:hidden"
        />
        <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col gap-4 lg:gap-8 items-center">
          {/* Heading */}
          <div className="text-center">
            <h3
              className="text-xl lg:text-3xl font-black max-w-lg text-center lg:leading-tight text-gray-900 drop-shadow-lg"
              style={{
                textShadow:
                  "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
              }}
            >
              Why Traditional Hiring Processes Are Holding You Back
            </h3>
          </div>

          {/* Fitur cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 justify-between items-center mt-6 w-full">
            <div className="flex flex-col space-y-4 bg-purple-100 p-6 items-start rounded-xl min-w-[150px] lg:min-w-[210px]">
              <BookCopy className="w-7 h-7" />
              <h3 className="text-gray-800 font-bold">
                Resume
                <br />
                Screening
              </h3>
            </div>
            <div className="flex-flex-col space-y-4 bg-pink-100 p-6 items-start rounded-xl min-w-[150px] lg:min-w-[210px]">
              <div>
                <LandPlot className="w-7 h-7" />
              </div>
              <h3 className="text-gray-800 font-bold">
                Candidate <br /> Personality
              </h3>
            </div>
            <div className="flex-flex-col space-y-4 bg-sky-100 p-6 items-start rounded-xl min-w-[150px] lg:min-w-[210px]">
              <div>
                <MonitorCheck className="w-7 h-7" />
              </div>
              <h3 className="text-gray-800 font-bold">
                AI sentiment <br /> Analysis
              </h3>
            </div>
            <div className="flex-flex-col space-y-4 bg-orange-100 p-6 items-start rounded-xl min-w-[150px] lg:min-w-[210px]">
              <div>
                <Ribbon className="w-7 h-7" />
              </div>
              <h3 className="text-gray-800 font-bold">
                Hiring AI <br /> Reports
              </h3>
            </div>
            <div className="flex-flex-col space-y-4 bg-green-100 p-6 items-start rounded-xl min-w-[150px] lg:min-w-[210px]">
              <div>
                <Ship className="w-7 h-7" />
              </div>
              <h3 className="text-gray-800 font-bold">
                AI Skill <br /> Assessments
              </h3>
            </div>
          </div>

          <div className="w-full bg-sky-500 rounded-xl">
            <div className="px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between text-center items-center">
              <div className="text-white font-normal text-start">
                <h3 className="max-w-xs">
                  AI-powered resume screening and shortlisting
                </h3>
              </div>
              <div className="flex gap-4 justify-center mt-4 md:mt-0 items-center">
                <button className="bg-white text-sky-600 rounded-full py-3 pl-3 pr-2 font-semibold flex items-center gap-2">
                  <p className="text-gray-800 font-medium text-sm me-1">
                    Let's Collaborate
                  </p>
                  <div className="p-1 bg-sky-500 rounded-full">
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </div>
                </button>
                <button className="bg-transparent border border-white text-white rounded-full py-3 pl-3 pr-2 font-semibold flex items-center gap-2">
                  <p className="text-white font-medium text-sm me-1">
                    View Details
                  </p>
                  <div className="p-1 bg-white rounded-full">
                    <ArrowUpRight className="w-3 h-3 text-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
