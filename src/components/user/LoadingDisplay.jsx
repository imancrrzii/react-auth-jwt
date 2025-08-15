const LoadingDisplay = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-100"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Memuat data pengguna...
          </p>
          <p className="text-sm text-gray-400">Harap tunggu sebentar</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingDisplay;