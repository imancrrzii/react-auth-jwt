import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormProvider, useForm } from "react-hook-form";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import StepProgress from "./StepProgress";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const steps = [Step1, Step2, Step3, Step4];
const LOCAL_KEY = "multi_step_form_data";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isToastActive, setIsToastActive] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
      // Step 1 - Informasi Personal
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",

      // Step 2 - Informasi Kontak
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",

      // Step 3 - Preferensi & Pengaturan
      interests: [],
      experience: 0,
      language: "",
      newsletter: false,
      notifications: false,
      darkMode: false,
      avatar: null,

      // Step 4 - Informasi Tambahan
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

  const CurrentStep = steps[currentStep];

  const nextStep = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < steps.length - 1) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(methods.getValues()));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log("🎉 SUBMIT:", data);
    localStorage.removeItem(LOCAL_KEY);

    setIsToastActive(true);

    toast.success(
      "Form berhasil dikirim!",
      {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          setIsToastActive(false);
          navigate("/retribusi/pengguna");
        },
      }
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="max-w-full mx-auto p-12 my-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white border-1 border-gray-200 shadow-sm rounded-md p-6 lg:w-1/4 hidden lg:block">
            <div className="space-y-6">
              {["Personal", "Kontak", "Preferensi", "Review"].map(
                (stepName, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      index === currentStep
                        ? "bg-sky-50 border-l-4 border-sky-600"
                        : index < currentStep
                        ? "bg-green-50 border-l-4 border-green-600"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index === currentStep
                          ? "bg-sky-600 text-white"
                          : index < currentStep
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`ml-3 font-medium ${
                        index === currentStep
                          ? "text-blue-700"
                          : index < currentStep
                          ? "text-green-700"
                          : "text-gray-600"
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          {/* MAIN FORM CONTENT */}
          <div className="bg-white border-1 border-gray-200 shadow-sm rounded-md p-6 flex-1">
            <FormProvider {...methods}>
              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentStep < steps.length - 1) {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              >
                {/* Step progress untuk mobile/tablet */}
                <div className="lg:hidden mb-6">
                  <StepProgress
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                </div>
                {/* STEP CONTENT */}
                <div className="min-h-[400px] transition-all duration-600">
                  <CurrentStep />
                </div>
                <div className="flex justify-between pt-6 border-gray-200">
                  {currentStep === 0 ? (
                    <button
                      type="button"
                      onClick={() => navigate("/retribusi/pengguna")}
                      className="flex items-center px-4 py-2 bg-white border-1 text-sky-600 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Kembali
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-4 py-2 bg-white border-1 text-sky-600 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Sebelumnya
                    </button>
                  )}
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600 hover:shadow-lg transition-all duration-200"
                    >
                      Kirim Form
                      <Check className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      Selanjutnya
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
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
        theme="white"
        toastClassName={() =>
          "flex p-6 min-h-15 bg-white text-black rounded-md justify-between overflow-hidden cursor-pointer z-50"
        }
        transition={Zoom}
      />
    </>
  );
}
