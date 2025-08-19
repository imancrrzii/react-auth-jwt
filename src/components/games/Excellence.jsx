import { SoapDispenserDroplet, TrafficCone, Webhook } from "lucide-react";
import React from "react";

const Excellence = () => {
  return (
    <div className="bg-white px-2 py-12 md:p-12">
      <div className="flex flex-col gap-4 md:gap-8 justify-center items-center text-center">
        <div>
          <h3
            className="text-2xl md:text-4xl font-black max-w-6xl text-center md:leading-tight text-gray-900 drop-shadow-md"
            style={{
              textShadow:
                "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
            }}
          >
            Meet HireSmart AI - Your End-to-End AI Hiring Assistant Video
            interviews with AI sentiment analysis
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 my-2 md:mb-8">
          <div className="bg-purple-100 px-4 py-2 rounded-full flex items-center justify-center gap-2 text-purple-500 italic font-normal text-md">
            <div>
              <SoapDispenserDroplet />
            </div>
            <h3>Upload Job Criteria</h3>
          </div>
          <div className="bg-sky-100 px-4 py-2 rounded-full flex items-center justify-center gap-2 text-sky-500 italic font-normal text-md">
            <div>
              <Webhook />
            </div>
            <h3>Screening</h3>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-full flex items-center justify-center gap-2 text-yellow-500 italic font-normal text-md">
            <div>
              <TrafficCone />
            </div>
            <h3>Schedule</h3>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-40 px-5">
          <div className="flex flex-col gap-2 justify-center text-center items-center">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl">70%</h1>
            <p className="text-sm text-gray-700">Faster Time-to-Hire</p>
          </div>
          <div className="flex flex-col gap-2 justify-center text-center items-center">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl">50%</h1>
            <p className="text-sm text-gray-700">Reduce Hiring Costs</p>
          </div>
          <div className="flex flex-col gap-2 justify-center text-center items-center">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-8xl">79+</h1>
            <p className="text-sm text-gray-700">Enhanced Candidate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Excellence;
