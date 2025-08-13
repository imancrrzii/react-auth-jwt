// import { Check } from "lucide-react";

// export default function SidebarProgress({
//   progresses,
//   currentStep,
//   isFormSubmitted = false,
// }) {
//   const stepCount = progresses.length;
//   const stepPositions = progresses.map((_, i) => (i / (stepCount - 1)) * 100);
//   const maxStepIndex = stepCount - 1;

//   let progressPercentage;

//   // Garis progress mentok di step terakhir (bukan 100%)
//   if (isFormSubmitted) {
//     progressPercentage = stepPositions[maxStepIndex];
//   } else if (currentStep >= maxStepIndex) {
//     progressPercentage = stepPositions[maxStepIndex];
//   } else {
//     progressPercentage = stepPositions[currentStep];
//   }

//   return (
//     <div className="hidden lg:flex justify-center px-4 py-16">
//       <div className="relative flex flex-col h-96 w-48 justify-between">
//         <div className="absolute left-5 top-0 bottom-0 w-1 rounded-full bg-gray-300" />

//         {/* Progress bar - limited height */}
//         <div
//           className="absolute left-5 top-0 w-1 rounded-full bg-emerald-600 transition-all duration-1000 ease-in-out"
//           style={{ height: `calc(${progressPercentage}% - 10px)` }} // -10px biar berhenti pas sebelum box terakhir
//         />

//         {stepPositions.map((pos, index) => {
//           const isActive = index === currentStep && !isFormSubmitted;
//           const isCompleted = index < currentStep || isFormSubmitted;

//           return (
//             <div
//               key={index}
//               className="absolute flex flex-col left-0"
//               style={{ top: `${pos}%`, transform: "translateY(-50%)" }}
//             >
//               <div className="flex items-center">
//                 {/* Number / Check icon */}
//                 <div
//                   className={`w-10 h-10 flex items-center justify-center rounded-md text-lg font-bold border-2 z-10 transition-all duration-1000 ${
//                     isActive
//                       ? "bg-sky-600 border-sky-700 text-white shadow-md"
//                       : isCompleted
//                       ? "bg-emerald-600 border-emerald-700 text-white"
//                       : "bg-gray-200 border-gray-300 text-gray-600"
//                   }`}
//                 >
//                   {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
//                 </div>

//                 {/* Title & Description */}
//                 <div className="ml-4">
//                   <span
//                     className={`block font-bold select-none transition-colors duration-1000 ${
//                       isActive
//                         ? "text-sky-700"
//                         : isCompleted
//                         ? "text-emerald-700"
//                         : "text-gray-600"
//                     }`}
//                   >
//                     {progresses[index]?.title}
//                   </span>
//                   <small
//                     className={`block text-xs font-semibold transition-colors duration-1000 ${
//                       isActive
//                         ? "text-sky-500"
//                         : isCompleted
//                         ? "text-emerald-600"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {progresses[index]?.description}
//                   </small>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { Check } from "lucide-react";

export default function SidebarProgress({
  progresses,
  currentStep,
  isFormSubmitted = false,
}) {
  return (
    <div className="hidden md:flex justify-center px-12 py-8 border border-gray-200 shadow-sm rounded-md">
      <div className="relative flex flex-col w-48">
        <h3 className="font-bold text-xl text-gray-800 mb-6">Buat Akun</h3>

        {progresses.map((progress, index) => {
          const isActive = index === currentStep && !isFormSubmitted;
          const isCompleted = index < currentStep || isFormSubmitted;
          const isLastStep = index === progresses.length - 1;

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div className="flex items-center w-full">
                <div
                  className={`w-12 h-11 flex items-center justify-center rounded-2xl text-lg font-bold border-1 z-10 transition-all duration-1000 ${
                    isActive
                      ? "bg-sky-500 border-sky-600 text-white shadow-md"
                      : isCompleted
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : "bg-gray-300 border-gray-200 text-white"
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                </div>

                {/* Title & Description */}
                <div className="ml-4">
                  <small
                    className={`block font-semibold text-xs select-none transition-colors duration-1000 ${
                      isActive
                        ? "text-sky-600"
                        : isCompleted
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
                        : isCompleted
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }`}
                  >
                    {progress?.description}
                  </h3>
                </div>
              </div>

              {/* Garis vertikal (step connector) */}
              {!isLastStep && (
                <div className="relative -left-18 w-1 h-16 my-2 rounded-full overflow-hidden bg-gray-300">
                  <div
                    className={`absolute left-0 top-0 w-full rounded-full transition-all duration-1000 ease-in-out ${
                      isCompleted
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
