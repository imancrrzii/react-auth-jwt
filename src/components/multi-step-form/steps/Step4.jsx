import { CheckCircle, Plus, Home } from "lucide-react";
import berhasil from "../../../assets/images/berhasil.svg"

const Step4 = ({ onNewForm, onBackToDashboard }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      <img src={berhasil} alt="" className="w-48 h-48" />

      <div className="text-center space-y-2 transition-all duration-500 delay-150 transform translate-y-0 opacity-100">
        <h2 className="text-2xl font-bold text-gray-800 transition-colors duration-300">Form Berhasil Dikirim!</h2>
        <p className="text-gray-600 max-w-md transition-colors duration-300">
          Data Anda telah berhasil disimpan. Terima kasih telah mengisi form pendaftaran.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-500 delay-300 transform translate-y-0 opacity-100">
        <button
          type="button"
          onClick={onNewForm}
          className="flex items-center justify-center px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2 transition-transform duration-200" />
          Input Data Lagi
        </button>
        
        <button
          type="button"
          onClick={onBackToDashboard}
          className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 hover:shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer transform active:scale-95"
        >
          <Home className="w-5 h-5 mr-2 transition-transform duration-200" />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default Step4;