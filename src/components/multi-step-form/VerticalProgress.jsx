import { Check } from "lucide-react";

export default function VerticalProgress({
  progresses,
  currentStep,
  isFormSubmitted = false,
}) {
  return (
    <div className="hidden md:flex justify-center px-12 py-8 border border-gray-200 shadow-xs rounded-md min-h-[80vh]">
      <div className="relative flex flex-col w-48">
        <h3 className="font-bold text-xl text-gray-800 mb-6">Buat Akun</h3>

        {progresses.map((progress, index) => {
          const isLastStep = index === progresses.length - 1;
          const isCompleted = isFormSubmitted ? index < progresses.length : index < currentStep;

          const isActive =
            !isFormSubmitted && index === currentStep && !isCompleted;

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div className="flex items-center w-full">
                <div
                  className={`w-12 h-11 flex items-center justify-center rounded-2xl text-lg font-bold border-1 z-10 transition-all duration-1000 ${
                    isActive
                      ? "bg-sky-500 border-sky-600 text-white shadow-md"
                      : isCompleted || (isFormSubmitted && isLastStep)
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : "bg-gray-300 border-gray-200 text-white"
                  }`}
                >
                  {isCompleted || (isFormSubmitted && isLastStep) ? <Check className="w-6 h-6" /> : index + 1}
                </div>

                <div className="ml-4">
                  <small
                    className={`block font-semibold text-xs select-none transition-colors duration-1000 ${
                      isActive
                        ? "text-sky-600"
                        : isCompleted || (isFormSubmitted && isLastStep)
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }`}
                  >
                    {progress?.title}
                  </small>
                  <h3
                    className={`block text-md font-bold transition-colors duration-1000 ${
                      isActive
                        ? "text-sky-500"
                        : isCompleted || (isFormSubmitted && isLastStep)
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }`}
                  >
                    {progress?.description}
                  </h3>
                </div>
              </div>

              {!isLastStep && (
                <div className="relative -left-18 w-1 h-16 my-2 rounded-full overflow-hidden bg-gray-300">
                  <div
                    className={`absolute left-0 top-0 w-full rounded-full transition-all duration-1000 ease-in-out ${
                      isCompleted || (isFormSubmitted && isLastStep)
                        ? "bg-emerald-500 h-full"
                        : isActive
                        ? "bg-sky-500 h-full"
                        : "bg-transparent h-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}