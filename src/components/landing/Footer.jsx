import footer from "../../assets/images/footer.svg";
import sifinaPutih from "../../assets/images/sifina-putih.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full mt-0">
      <img
        src={footer}
        alt="footer wave"
        className="w-full h-auto object-cover block"
      />
      <div className="bg-[#0ea3e8] w-full pt-8 pb-12 px-8 md:px-16">
        <div className="flex flex-col items-start lg:items-center md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-6">
            <img src={sifinaPutih} alt="" className="w-48" />
            <h3 className="text-2xl md:text-4xl font-medium lg:max-w-[400px] tracking-wide leading-12 text-white">
              Solusi Tepat untuk Kebutuhan Anda!
            </h3>
            <p className="text-gray-200 text-sm font-normal lg:max-w-[550px]">
              Bank Sumsel Babel secara konsisten terus berkembang, menghadirkan
              layanan terbaik guna mendukung kemajuan dan memenuhi kebutuhan
              daerah Sumatera Selatan dan Bangka Belitung.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-8 ">
            <div className="flex flex-col gap-2">
              <h6 className="text-white text-sm font-semibold">
                Layanan SIFina
              </h6>
              <div className="flex flex-col">
                <Link
                  to="/portal"
                  className="hover:underline hover:text-sky-200 transition text-white text-sm font-light"
                >
                  SIFina Dashboard
                </Link>
                <Link
                  to="/fitur"
                  className="hover:underline hover:text-sky-200 transition text-white text-sm font-light"
                >
                  SIFina Portal
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-white text-sm font-semibold">
                Tentang SIFina
              </h6>
              <Link
                to="/tentang-sifina"
                className="hover:underline hover:text-sky-200 transition text-white text-sm font-light"
              >
                Tentang SIFina
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center px-8 lg:px-0 py-8 border-t-2 border-sky-400 bg-[#0ea3e8]">
        <p className="text-xs text-white font-light tracking-wide">
          © 2024. Divisi Teknologi dan Sistem Informasi PT Bank Pembangunan
          Daerah Sumatera Selatan dan Bangka Belitung
        </p>
      </div>
    </div>
  );
};

export default Footer;
