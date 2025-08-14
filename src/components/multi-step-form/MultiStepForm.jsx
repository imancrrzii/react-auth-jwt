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
import StepProgress from "./StepProgress";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import SidebarProgress from "./SidebarProgress";

const steps = [Step1, Step2, Step3, Step4];
const LOCAL_KEY = "multi_step_form_data";

export default function MultiStepForm({ initialData }) {
  const [currentStep, setCurrentStep] = useState(0);
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
        pilihanInstitusi:"",
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

  const progresses = [
    { title: "Langkah 1", description: "Data Institusi", icon: User },
    { title: "Langkah 2", description: "Data User", icon: Mail },
    {
      title: "Langkah 3",
      description: "Data Opsional",
      icon: Settings,
    },
    { title: "Langkah 4", description: "Data Review", icon: Check },
  ];

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

    setIsFormSubmitted(true);
    setIsToastActive(true);

    toast.success("Form berhasil dikirim!", {
      position: "top-center",
      autoClose: 2000,
      onClose: () => {
        setIsToastActive(false);
        navigate("/retribusi/pengguna");
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    methods.handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="max-w-full mx-auto p-12 my-4 relative">
        {isToastActive && (
          <div className="fixed inset-0 backdrop-brightness-50 z-40" />
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <SidebarProgress
            steps={steps}
            progresses={progresses}
            currentStep={currentStep}
            isFormSubmitted={isFormSubmitted}
          />

          <div className="bg-white border border-gray-200 shadow-sm rounded-md px-6 py-8 flex-1">
            <FormProvider {...methods}>
              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentStep < steps.length - 1) {
                    e.preventDefault();
                    nextStep();
                  }
                }}
              >
                <div className="md:hidden mb-6">
                  <StepProgress
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                </div>

                <div className="min-h-[500px] transition-all duration-600">
                  <CurrentStep />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-gray-200">
                  {currentStep === 0 ? (
                    <button
                      type="button"
                      onClick={() => navigate("/retribusi/pengguna")}
                      className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      disabled={isFormSubmitted}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Kembali
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-4 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isFormSubmitted}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Sebelumnya
                    </button>
                  )}
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      disabled={isFormSubmitted}
                    >
                      {isFormSubmitted ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Berhasil Dikirim!
                        </>
                      ) : (
                        <>
                          Kirim Form
                          <Check className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isFormSubmitted}
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
        theme="light"
        toastClassName={() =>
          "flex p-6 min-h-15 bg-white text-black rounded-md justify-between overflow-hidden cursor-pointer z-50 shadow-lg border"
        }
        transition={Zoom}
      />
    </>
  );
}
