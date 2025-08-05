import { IoMdCheckmark } from "react-icons/io";

const Content = () => {
  return (
    <div className="bg-white container mx-auto pb-16 px-4 lg:px-0">
      <div className="flex flex-col gap-6 justify-between lg:flex-row">
        <div className="bg-[#e0f3ff] p-10 lg:p-12 rounded-4xl w-full lg:w-1/2">
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-2xl">
              Latar Belakang <span className="text-sky-500">SIFina</span>
            </h3>
            <p className="text-md font-normal">
              SIFina lahir dari gagasan dan komitmen Bank Sumsel Babel untuk
              terus meningkatkan layanan terbaik kepada mitra-mitra daerah
              secara luas (Pemerintah Daerah, Dinas, BUMN/BUMD, Lembaga
              Pendidikan Universitas/Sekolah, Perusahaan, UMKM, mitra lainnya)
              guna mendukung kemajuan dan memenuhi kebutuhan Sumatera Selatan
              dan Bangka Belitung. Kami melihat kebutuhan akan akses informasi
              data perbankan yang dimiliki nasabah agar dapat di akses lebih
              fleksibel di mana saja dan kapan saja.
            </p>
            <p>
              Platform digital SIFina merupakan inovasi yang dikembangkan untuk
              menjawab tantangan digitalisasi untuk menghadirkan suatu layanan
              yang cepat, personal dan efisien sesuai dengan kebutuhan mitra
              Bank.
            </p>
          </div>
        </div>
        <div className="bg-[#e0f3ff] p-10 lg:p-12 rounded-4xl w-full lg:w-1/2">
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-2xl">
              Tujuan <span className="text-sky-500">SIFina</span>
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                  <IoMdCheckmark className="w-4 h-4" />
                </label>
                <h6 className="font-bold items-center tracking-wide">
                  Meningkatkan Aksesibilitas dan Efisiensi
                </h6>
              </div>
              <p>
                Mempermudah akses pengguna ke layanan atau sistem, sekaligus
                mempercepat proses dengan meminimalkan hambatan.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                  <IoMdCheckmark className="w-4 h-4" />
                </label>
                <h6 className="font-bold items-center tracking-wide">
                  Adaptabilitas Terhadap Perubahan
                </h6>
              </div>
              <p>
                Beradaptasi dengan cepat terhadap perkembangan teknologi dan
                dinamika bisnis yang mencakup fleksibilitas dalam mengadopsi
                inovasi baru, penyesuaian terhadap tren pasar, serta respons
                terhadap kebutuhan pengguna dan model bisnis.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row">
                <label className="bg-sky-500 text-white px-2 py-2 rounded-full mr-4 self-start">
                  <IoMdCheckmark className="w-4 h-4" />
                </label>
                <h6 className="font-bold items-center tracking-wide">
                  Segmentasi Segmen Pasar
                </h6>
              </div>
              <p>
                Menghasilkan layanan yang fokus pada segmen pasar tertentu
                dengan lebih mendalam dan relevan antara lain Pemerintah Daerah,
                Dinas, BUMN/BUMD, Lembaga Pendidikan Universitas/Sekolah,
                Perusahaan, UMKM, mitra lainnya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
