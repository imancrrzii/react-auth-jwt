import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormProvider, useForm } from "react-hook-form";
import StepProgress from "./StepProgress";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const steps = [Step1, Step2, Step3, Step4];
const LOCAL_KEY = "multi_step_form_data";

export default function MultiStepForm() {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: JSON.parse(localStorage.getItem(LOCAL_KEY)) || {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];
  const navigate = useNavigate();

  const onNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const onPrev = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log("🎉 SUBMIT:", data);
    localStorage.removeItem(LOCAL_KEY);
    toast.success("Form berhasil dikirim!", {
      position: "top-right",
      autoClose: 1000,
      onClose: () => navigate("/dashboard"),
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* CARD STEP PROGRESS - tampil hanya di md ke atas */}
        <div className="bg-white shadow rounded p-6 md:w-1/3 hidden md:block">
          <StepProgress
            currentStep={step}
            totalSteps={steps.length}
            vertical={true}
          />
        </div>

        {/* CARD FORM */}
        <div className="bg-white shadow rounded p-6 flex-1">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && step < steps.length - 1) {
                  e.preventDefault();
                  onNext();
                }
              }}
            >
              {/* Step progress untuk mobile */}
              <div className="md:hidden mb-4">
                <StepProgress currentStep={step} totalSteps={steps.length} />
              </div>

              {/* STEP CONTENT */}
              <div className="transition-all duration-500">
                <CurrentStep />
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={onPrev}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Sebelumnya
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Kirim
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
