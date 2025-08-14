import { Check } from "lucide-react";

const HorizontalProgress = ({
  currentStep = 0,
  totalSteps,
  isFormSubmitted = false,
  steps,
}) => {
  const defaultSteps = [
    { title: "Langkah 1", description: "Data Institusi" },
    { title: "Langkah 2", description: "Data User" },
    { title: "Langkah 3", description: "Data Opsional" },
    { title: "Langkah 4", description: "Data Review" },
  ];

  const finalSteps = steps || defaultSteps;
  const finalTotalSteps = totalSteps || finalSteps.length;

  return (
    <div className="w-full px-2 py-6 lg:p-6 bg-white rounded-lg shadow-xs border border-gray-200">
      <div className="relative">
        <div className="flex items-start justify-between relative">
          {finalSteps.slice(0, finalTotalSteps).map((step, index) => {
            const isActive = index === currentStep && !isFormSubmitted;
            const isCompleted = index < currentStep || isFormSubmitted;
            const isLastStep = index === finalTotalSteps - 1;

            return (
              <div
                key={index}
                className="flex flex-col items-center relative flex-1"
              >
                <div
                  className={`
                  flex items-center justify-center w-10 h-9 sm:w-12 sm:h-11 rounded-xl border-2 
                  transition-all duration-500 ease-in-out relative z-10 
                  ${
                    isActive
                      ? "!bg-sky-500 border-sky-600 text-white shadow-lg transform scale-110"
                      : isCompleted
                      ? "!bg-emerald-500 border-emerald-600 text-white shadow-md"
                      : "bg-gray-300 border-gray-300 text-white"
                  }
                `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-bold">{index + 1}</span>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <div
                    className={`
                   font-semibold text-xs transition-colors duration-300
                    ${
                      isActive
                        ? "text-sky-600"
                        : isCompleted
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }
                  `}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`
                    text-sm sm:text-md mt-0.5 font-bold transition-colors duration-1000
                    ${
                      isActive
                        ? "text-sky-500"
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }
                  `}
                  >
                    {step.description}
                  </div>
                </div>

                {!isLastStep && (
                  <>
                    <div
                      className="absolute top-4 lg:top-6 h-1 bg-gray-200 rounded-full"
                      style={{
                        left: "calc(50% + 32px)",
                        right: "calc(-50% + 32px)",
                        zIndex: 1,
                      }}
                    />

                    <div
                      className="absolute top-4 lg:top-6 h-1 rounded-full"
                      style={{
                        left: "calc(50% + 32px)",
                        right: "calc(-50% + 32px)",
                        zIndex: 2,
                      }}
                    >
                      <div
                        className={`
                        h-full rounded-full transition-all duration-700 ease-in-out
                        ${
                          isCompleted
                            ? "w-full bg-emerald-500"
                            : isActive
                            ? "w-full bg-sky-500"
                            : "w-0 bg-transparent"
                        }
                      `}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProgress;