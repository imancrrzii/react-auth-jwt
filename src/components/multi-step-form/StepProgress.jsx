export default function StepProgress({ currentStep, totalSteps, vertical = false }) {
  if (vertical) {
    return (
      <div className="relative flex flex-col items-start">
        {/* Garis background */}
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-300"></div>

        {/* Garis progress biru */}
        <div
          className="absolute left-3 top-0 w-[2px] bg-blue-500 transition-all duration-300"
          style={{
            height: `${(currentStep / (totalSteps - 1)) * 100}%`,
          }}
        ></div>

        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} className="relative flex items-center mb-6 last:mb-0">
            {/* Titik step */}
            <div
              className={`z-10 w-6 h-6 flex items-center justify-center rounded-full border-2
              ${
                i < currentStep
                  ? "bg-blue-500 text-white border-blue-500" // sudah dilewati
                  : i === currentStep
                  ? "bg-white text-blue-500 border-blue-500 font-bold" // current step
                  : "bg-white border-gray-400 text-gray-400" // belum dilewati
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`ml-3 ${
                i < currentStep
                  ? "text-blue-500"
                  : i === currentStep
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Step {i + 1}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Horizontal mode
  return (
    <div className="relative w-full mb-4">
      {/* Garis background */}
      <div className="absolute top-3 left-0 right-0 h-[2px] bg-gray-300"></div>

      {/* Garis progress biru */}
      <div
        className="absolute top-3 left-0 h-[2px] bg-blue-500 transition-all duration-300"
        style={{
          width: `${(currentStep / (totalSteps - 1)) * 100}%`,
        }}
      ></div>

      <div className="flex justify-between relative z-10">
        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full border-2
              ${
                i < currentStep
                  ? "bg-blue-500 text-white border-blue-500" // sudah dilewati
                  : i === currentStep
                  ? "bg-white text-blue-500 border-blue-500 font-bold" // current step
                  : "bg-white border-gray-400 text-gray-400" // belum dilewati
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`mt-2 text-xs ${
                i < currentStep
                  ? "text-blue-500"
                  : i === currentStep
                  ? "text-blue-600 font-bold"
                  : "text-gray-600"
              }`}
            >
              Step {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
