import sifina1 from "../../assets/images/sifina-dashboard-1.png";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const SifinaDashboard = () => {
  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="flex justify-between flex-col sm:flex-row p-0 lg:px-16 relative">
        <div className="flex justify-start pl-8 lg:pl-0 w-full md:w-2/5 lg:w-1/2">
          <img src={sifina1} alt="" className="w-64 lg:w-144" />
        </div>
        <div className="flex flex-col gap-6 p-8 lg:pr-16 lg:pl-0 lg:py-16 w-full md:w-3/5 lg:w-1/2 ">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-wide ">
            <div>Dashboard</div>
            <div className="mt-4">
              Informasi <span className="text-sky-500">SIFina</span>
            </div>
          </h3>
          <p className="">
            Mengelola keuangan kini lebih mudah dengan Dashboard Informasi
            SIFina. Kami memberikan akses real-time ke data keuangan Anda,
            memungkinkan Anda untuk mengetahui posisi saldo secara cepat serta
            melihat setiap transaksi yang terjadi dalam rekening Anda, kapan
            saja dan di mana saja.
          </p>
          <div className="flex flex-col gap-2 item-center py-2">
            <div className="flex px-4 font-bold items-center">
              <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                <IoMdCheckmark className="w-4 h-4" />
              </label>
              <p>Informasi Saldo multi rekening secara Real-Time</p>
            </div>
            <div className="flex px-4 font-bold items-center">
              <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                <IoMdCheckmark className="w-4 h-4" />
              </label>
              <p>Laporan Mutasi Rekening Terperinci</p>
            </div>
            <div className="flex px-4 font-bold items-center">
              <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                <IoMdCheckmark className="w-4 h-4" />
              </label>
              <p>Laporan Transaksi QRIS dan Virtual Account</p>
            </div>
          </div>
          <Link
            to={"/login"}
            className="   
            px-4 py-3 
            rounded-lg 
            text-white 
            hover:opacity-90
            font-normal
            text-sm	
            min-w-[100px]
            shadow-md w-[250px] mt-4 hover:bg-sky-600 z-10 bg-sky-500 
            "
          >
            <div className="flex items-center gap-2">
              <p className="w-full text-center font-semibold cursor-pointer">
                Masuk Aplikasi
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SifinaDashboard;
