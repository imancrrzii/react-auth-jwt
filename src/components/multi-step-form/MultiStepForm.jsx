// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FormProvider, useForm } from "react-hook-form";
// import {
//   User,
//   Mail,
//   Settings,
//   Check,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import ResponsiveProgressStepper from "./ResponsiveProgressStepper";
// import Step1 from "./steps/Step1";
// import Step2 from "./steps/Step2";
// import Step3 from "./steps/Step3";
// import Step4 from "./steps/Step4";

// const stepComponents = [Step1, Step2, Step3, Step4];
// const LOCAL_KEY = "multi_step_form_data";

// export default function MultiStepForm({
//   initialData,
//   initialStep = 0,
//   onFormSubmit,
// }) {
//   const [currentStep, setCurrentStep] = useState(initialStep);
//   const [isToastActive, setIsToastActive] = useState(false);
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const methods = useForm({
//     mode: "onSubmit",
//     defaultValues: initialData ||
//       JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
//         firstName: "",
//         lastName: "",
//         birthDate: "",
//         gender: "",
//         pilihanInstitusi: "",
//         universitas: "",
//         kota_universitas: "",
//         email: "",
//         phone: "",
//         country: "",
//         city: "",
//         address: "",
//         interests: [],
//         experience: 0,
//         language: "",
//         newsletter: false,
//         notifications: false,
//         darkMode: false,
//         avatar: null,
//         subscription: "",
//         paymentMethod: "",
//         referral: "",
//         website: "",
//         notes: "",
//         terms: false,
//         privacy: false,
//         marketing: false,
//       },
//   });

//   const stepsConfig = [
//     { title: "Langkah 1", description: "Data Institusi", icon: User },
//     { title: "Langkah 2", description: "Data User", icon: Mail },
//     { title: "Langkah 3", description: "Data Opsional", icon: Settings },
//     { title: "Langkah 4", description: "Selesai", icon: Check },
//   ];

//   const CurrentStep = stepComponents[currentStep];
//   const totalSteps = stepComponents.length;

//   const nextStep = async () => {
//     const isValid = await methods.trigger();
//     if (isValid && currentStep < 2) {
//       localStorage.setItem(LOCAL_KEY, JSON.stringify(methods.getValues()));
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = async (data) => {
//     console.log("🎉 SUBMIT:", data);
//     localStorage.removeItem(LOCAL_KEY);

//     setIsFormSubmitted(true);
//     setIsToastActive(true);

//     if (onFormSubmit) {
//       onFormSubmit(data);
//     }

//     toast.success("Form berhasil dikirim!", {
//       position: "top-center",
//       autoClose: 1000,
//       onClose: () => {
//         setIsToastActive(false);
//         setTimeout(() => {
//           setCurrentStep(3);
//         }, 100);
//       },
//     });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     methods.handleSubmit(handleSubmit)();
//   };

//   const handleNewForm = () => {
//     methods.reset();
//     setTimeout(() => {
//       setCurrentStep(0);
//       setIsFormSubmitted(false);
//     }, 200);
//     localStorage.removeItem(LOCAL_KEY);
//   };

//   const handleBackToDashboard = () => {
//     navigate("/retribusi/pengguna");
//   };

//   // Tentukan apakah ini adalah step pengisian form (0-2) atau success page (3)
//   const isSuccessStep = currentStep === 3;

//   return (
//     <>
//       <div className="max-w-full mx-auto p-4 lg:p-12 my-4 relative">
//         {isToastActive && (
//           <div className="fixed inset-0 backdrop-brightness-50 z-40" />
//         )}

//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Gunakan komponen ResponsiveProgressStepper yang baru */}
//           <ResponsiveProgressStepper
//             currentStep={currentStep}
//             totalSteps={totalSteps}
//             isFormSubmitted={isFormSubmitted}
//             steps={stepsConfig}
//             title="Buat Akun"
//           />

//           <div className="bg-white border border-gray-200 shadow-sm rounded-md px-6 py-8 flex-1">
//             <FormProvider {...methods}>
//               {isSuccessStep ? (
//                 // Tampilkan Step 4 (Success Page) tanpa form wrapper
//                 <div className="transition-all duration-500 ease-in-out">
//                   <Step4
//                     onNewForm={handleNewForm}
//                     onBackToDashboard={handleBackToDashboard}
//                   />
//                 </div>
//               ) : (
//                 // Tampilkan form steps (1-3)
//                 <div className="transition-all duration-300 ease-in-out">
//                   <div
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && currentStep < 2) {
//                         e.preventDefault();
//                         nextStep();
//                       }
//                     }}
//                   >
//                     <div className="transition-all duration-300 ease-in-out transform">
//                       <div
//                         className={`transition-opacity duration-200 ${
//                           isFormSubmitted ? "opacity-50" : "opacity-100"
//                         }`}
//                       >
//                         <CurrentStep />
//                       </div>
//                     </div>

//                     <div className="flex justify-end gap-4 pt-6 border-gray-200">
//                       {currentStep === 0 ? (
//                         <button
//                           type="button"
//                           onClick={() => navigate("/retribusi/pengguna")}
//                           className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
//                           disabled={isFormSubmitted}
//                         >
//                           <ChevronLeft className="w-4 h-4 mr-1" />
//                           Kembali
//                         </button>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={prevStep}
//                           className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isFormSubmitted}
//                         >
//                           <ChevronLeft className="w-4 h-4 mr-1" />
//                           Sebelumnya
//                         </button>
//                       )}

//                       {currentStep === 2 ? (
//                         // Step 3 (terakhir) - tombol submit
//                         <button
//                           type="button"
//                           onClick={handleFormSubmit}
//                           className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//                           disabled={isFormSubmitted}
//                         >
//                           {isFormSubmitted ? (
//                             <>
//                               <Check className="w-4 h-4 mr-1" />
//                               Berhasil Dikirim!
//                             </>
//                           ) : (
//                             <>
//                               Kirim Form
//                               <Check className="w-4 h-4 ml-1" />
//                             </>
//                           )}
//                         </button>
//                       ) : (
//                         // Step 1-2 - tombol next
//                         <button
//                           type="button"
//                           onClick={nextStep}
//                           className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                           disabled={isFormSubmitted}
//                         >
//                           Selanjutnya
//                           <ChevronRight className="w-4 h-4 ml-1" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </FormProvider>
//           </div>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={true}
//         rtl={false}
//         pauseOnFocusLoss={false}
//         draggable
//         pauseOnHover={false}
//         theme="light"
//         toastClassName={() =>
//           "flex p-4 min-h-12 bg-white text-black rounded-lg justify-between overflow-hidden cursor-pointer z-50 shadow-xl border border-green-200 transition-all duration-300 transform hover:scale-105"
//         }
//         transition={Zoom}
//       />
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormProvider, useForm } from "react-hook-form";
import {
  User,
  Mail,
  Settings,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HorizontalProgress from "./HorizontalProgress";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import VerticalProgress from "./VerticalProgress";

const stepComponents = [Step1, Step2, Step3, Step4];
const LOCAL_KEY = "multi_step_form_data";

export default function MultiStepForm({
  initialData,
  initialStep = 0,
  onFormSubmit,
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: initialData ||
      JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        pilihanInstitusi: "",
        universitas: "",
        kota_universitas: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        interests: [],
        experience: 0,
        language: "",
        newsletter: false,
        notifications: false,
        darkMode: false,
        avatar: null,
        subscription: "",
        paymentMethod: "",
        referral: "",
        website: "",
        notes: "",
        terms: false,
        privacy: false,
        marketing: false,
      },
  });

  const stepsConfig = [
    { title: "Langkah 1", description: "Data Institusi", icon: User },
    { title: "Langkah 2", description: "Data User", icon: Mail },
    { title: "Langkah 3", description: "Data Opsional", icon: Settings },
    { title: "Selesai", description: "Berhasil", icon: Check },
  ];

  const CurrentStep = stepComponents[currentStep];
  const totalSteps = stepComponents.length;

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < totalSteps - 1) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(methods.getValues()));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNewForm = () => {
    methods.reset(); // reset semua input
    localStorage.removeItem(LOCAL_KEY); // bersihin data localStorage
    setIsFormSubmitted(false);
    setCurrentStep(0); // balik lagi ke step pertama
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // arahkan ke dashboard (atau path sesuai kebutuhanmu)
  };

  const handleSubmit = async (data) => {
    console.log("🎉 SUBMIT:", data);
    localStorage.removeItem(LOCAL_KEY);

    setIsFormSubmitted(true);
    setIsToastActive(true); // PENTING: Pindah ke Langkah 4 (indeks 3) setelah form berhasil terkirim

    setCurrentStep(3); // Menampilkan Step 4 (Tampilan Sukses) // Call external onFormSubmit if provided

    if (onFormSubmit) {
      onFormSubmit(data);
    }

    toast.success("Form berhasil dikirim!", {
      position: "top-center",
      autoClose: 500,
      onClose: () => {
        setIsToastActive(false);
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(handleSubmit)();
  };

  return (
    <>
      <div className="w-full relative ">
        {isToastActive && (
          <div className="fixed inset-0 backdrop-brightness-50 z-40" />
        )}

        <div className="md:hidden mb-4">
          <div className="block">
            <HorizontalProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              isFormSubmitted={isFormSubmitted}
              steps={stepsConfig}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 min-h-[80vh]">
          <div className="hidden md:block">
            <VerticalProgress
              steps={stepsConfig}
              progresses={stepsConfig}
              currentStep={currentStep}
              isFormSubmitted={isFormSubmitted}
            />
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-md flex-1 max-h-[80vh] overflow-y-auto scrollbar-none mt-4 lg:mt-0">
            <FormProvider {...methods}>
              <form
                className="px-6 py-8"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentStep < totalSteps - 1) {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              >
                <div className="transition-all duration-600 w-full">
                  {isFormSubmitted && currentStep === 3 ? (
                    <Step4
                      onNewForm={handleNewForm}
                      onBackToDashboard={handleBackToDashboard}
                    />
                  ) : (
                    <CurrentStep />
                  )}
                </div>

                {!isFormSubmitted && (
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-6">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Sebelumnya
                      </button>
                    )}
                    {currentStep === 0 && (
                      <button
                        type="button"
                        onClick={() => navigate("/retribusi/pengguna")}
                        className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Kembali
                      </button>
                    )}
                    {currentStep === 2 ? (
                      <button
                        type="button"
                        onClick={handleFormSubmit}
                        className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg transition-all duration-200"
                      >
                        <Check className="w-4 h-4 me-1" />
                        Kirim Form
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        Selanjutnya
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                )}
              </form>
            </FormProvider>
            <style jsx>{`
              .scrollbar-none::-webkit-scrollbar {
                width: 0;
                height: 0;
              }

              .scrollbar-none::-webkit-scrollbar-thumb {
                background-color: transparent;
              }

              .scrollbar-none::-webkit-scrollbar-track {
                background-color: transparent;
              }

              .scrollbar-none {
                -ms-overflow-style: none; /* for IE and Edge */
                scrollbar-width: none; /* for Firefox */
              }
            `}</style>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName={() =>
          "flex p-6 min-h-15 bg-white text-black rounded-md justify-between overflow-hidden cursor-pointer z-50 shadow-lg border"
        }
        transition={Zoom}
      />
    </>
  );
}
