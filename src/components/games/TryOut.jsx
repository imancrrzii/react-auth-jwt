import image1 from "../../assets/images/games/36.png";

const TryOut = () => {
  return (
    <div className="px-2 py-6 lg:py-12 md:p-12 w-full mx-auto bg-gradient-to-b from-white to-orange-100">
      <div className="p-12 bg-white border border-gray-200 shadow-xs md:px-20 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto rounded-4xl">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="bg-sky-100 text-sky-600 py-2 px-3 w-fit rounded-full uppercase tracking-widest font-semibold text-xs items-center">
            👌 Don't miss out
          </div>
          <div className="text-2xl lg:text-4xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div className="text-sm lg:w-1/4 text-gray-700 text-shadow-gray-600 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </div>
          <button className="bg-sky-500 text-white w-fit px-6 py-2 rounded-full font-medium mt-2">
            Try out now
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src={image1} alt="" className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
};

export default TryOut;
