import { Check, Mail, Settings, User } from "lucide-react";

const StepProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { title: "Personal", icon: User },
    { title: "Kontak", icon: Mail },
    { title: "Preferensi", icon: Settings },
    { title: "Selesai", icon: Check },
  ];

  const percent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="relative flex items-center justify-between mb-4">
        {steps.slice(0, totalSteps).map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-white border-green-600 text-green-600"
                    : isActive
                    ? "bg-white border-sky-500 text-sky-500 shadow-lg"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <div className="mt-2 text-sm text-center">
                <span
                  className={`transition-all duration-300 ${
                    isActive
                      ? "text-sky-600 font-semibold"
                      : isCompleted
                      ? "text-green-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}

        {totalSteps > 1 && (
          <>
            <div
              className="absolute top-10 left-6 right-6 h-2 bg-gray-200 rounded-full"
              style={{ zIndex: 1 }}
            />

            <div
              className="absolute top-10 left-6 h-2 bg-green-500 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `calc(${percent}% - 48px)`,
                zIndex: 2,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StepProgress;

// export default function StepProgress({ currentStep, totalSteps }) {
//   const percent = ((currentStep + 1) / totalSteps) * 100;

//   return (
//     <div className="w-full mb-4">
//       <div className="flex justify-between text-xs mb-1 text-gray-500">
//         {[...Array(totalSteps)].map((_, i) => (
//           <span key={i} className={i === currentStep ? "font-bold text-gray-600" : ""}>
//             Step {i + 1}
//           </span>
//         ))}
//       </div>
//       <div className="w-full bg-gray-200 h-2 rounded">
//         <div
//           className="bg-gray-500 h-2 rounded transition-all duration-300"
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }
