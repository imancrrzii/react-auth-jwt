import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorDisplay = ({ error, onRetry }) => {
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-xs border border-red-200 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-100 rounded-full opacity-20 -ml-12 -mb-12"></div>

          <div className="text-center relative z-10 flex flex-col items-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-red-700 mb-3">
              Oops! Terjadi Kesalahan
            </h2>

            {/* Error Message */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 mb-6 border border-red-200 inline-block">
              <p className="text-red-600 font-medium text-sm leading-relaxed text-center">
                {error}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={onRetry}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-sky-600 hover:to-sky-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              Coba Lagi
            </button>

            <p className="text-gray-600 text-sm mt-4">
              Jika masalah terus berlanjut, silakan hubungi tim support
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorDisplay;
