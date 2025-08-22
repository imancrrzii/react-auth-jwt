import { Check } from "lucide-react";

const HorizontalProgress = ({
  currentStep = 0,
  totalSteps = 4,
  isFormSubmitted = false,
  steps,
}) => {
  const defaultSteps = [
    { title: "Langkah 1", description: "Data Induk" },
    { title: "Langkah 2", description: "Data Institusi" },
    { title: "Langkah 3", description: "Data Pengguna" },
    { title: "Selesai", description: "Berhasil Mengisi Data" },
  ];

  const finalSteps = steps || defaultSteps;

  // Hitung persentase berdasarkan step yang completed
  const completedSteps = isFormSubmitted ? totalSteps : currentStep;
  const percentage = Math.min((completedSteps / totalSteps) * 100, 100);

  // Tentukan status step saat ini
  const isCurrentStepCompleted =
    currentStep < completedSteps || isFormSubmitted;
  const isLastStep = currentStep === totalSteps - 1;
  const isSuccessStep = isLastStep && isFormSubmitted;

  return (
    <div className="w-full pt-6 lg:p-6">
      <div className="mt-6 flex items-center">
        <div className="flex gap-4 items-start">
          <div
            className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-all duration-500 ease-in-out
              ${
                isSuccessStep
                  ? "bg-emerald-500 border-emerald-600 text-white shadow-lg transform scale-110"
                  : isCurrentStepCompleted
                  ? "bg-emerald-500 border-emerald-600 text-white shadow-md"
                  : "bg-sky-500 border-sky-600 text-white shadow-sm"
              }
            `}
          >
            {isCurrentStepCompleted ? (
              <Check className="w-6 h-6 transition-all duration-300" />
            ) : (
              <span className="font-bold transition-all duration-300">
                {currentStep + 1}
              </span>
            )}
          </div>

          <div className="text-left">
            <div
              className={`
                text-sm font-semibold transition-colors duration-300
                ${
                  isSuccessStep
                    ? "text-emerald-600"
                    : isCurrentStepCompleted
                    ? "text-emerald-600"
                    : "text-sky-600"
                }
              `}
            >
              {finalSteps[currentStep]?.title}
            </div>
            <div
              className={`
                text-md font-bold transition-colors duration-300
                ${
                  isSuccessStep
                    ? "text-emerald-500"
                    : isCurrentStepCompleted
                    ? "text-emerald-500"
                    : "text-gray-600"
                }
              `}
            >
              {finalSteps[currentStep]?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar dengan Multiple Colors */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
        {/* Background completed portion (hijau) */}
        {isFormSubmitted && (
          <div
            className="absolute top-0 left-0 h-1 bg-emerald-500 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: "100%" }}
          />
        )}

        {/* Current progress (biru atau hijau) */}
        {!isFormSubmitted && (
          <div
            className={`
              absolute top-0 left-0 h-1 rounded-full transition-all duration-500 ease-in-out
              ${isCurrentStepCompleted ? "bg-emerald-500" : "bg-sky-500"}
            `}
            style={{ width: `${percentage}%` }}
          />
        )}

        {/* Progress indicator with gradient effect */}
        <div
          className={`
            absolute top-0 h-1 rounded-full transition-all duration-500 ease-in-out opacity-50
            ${
              isFormSubmitted
                ? "bg-emerald-300"
                : isCurrentStepCompleted
                ? "bg-emerald-300"
                : "bg-sky-300"
            }
          `}
          style={{
            width: `${Math.min(percentage + 10, 100)}%`,
            left: 0,
          }}
        />
      </div>

      {/* Progress percentage text */}
      <div className="flex justify-between items-center mt-2">
        <div
          className={`
            text-xs font-medium transition-colors duration-300
            ${
              isSuccessStep
                ? "text-emerald-600"
                : isCurrentStepCompleted
                ? "text-emerald-600"
                : "text-sky-600"
            }
          `}
        >
          {isFormSubmitted
            ? "Selesai!"
            : `Step ${currentStep + 1} dari ${totalSteps}`}
        </div>
        <div
          className={`
            text-xs font-bold transition-colors duration-300
            ${
              isSuccessStep
                ? "text-emerald-500"
                : isCurrentStepCompleted
                ? "text-emerald-500"
                : "text-sky-500"
            }
          `}
        >
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  );
};

export default HorizontalProgress;
