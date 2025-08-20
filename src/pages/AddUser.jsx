import { ArrowLeft } from "lucide-react";
import MultiStepForm from "../components/multi-step-form/MultiStepForm";
import usePageTitle from "../hooks/usePageTitle";
import { Link } from "react-router-dom";

const AddUser = () => {
  usePageTitle("Latihan SIFina | Tambah Pengguna");
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 p-8">
        <div className="flex border-1 border-gray-200 bg-gray-50 p-4 justify-start gap-2 items-center rounded-2xl">
          <Link to="/retribusi/pengguna">
            <div className="border-1 bg-white p-2 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </div>
          </Link>
          <h3 className="font-semibold">Daftar Pengguna SIFina Mobile Apps</h3>
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default AddUser;
