import { useState } from "react";
import { faqData } from "../../utils/data";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const AccordionItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl shadow-xs px-6 py-4 cursor-pointer border border-gray-50"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-left text-gray-800 text-md">{question}</h4>
          <span className="text-black">
            {open ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}
          </span>
        </div>
      </div>

      {open && (
        <div className="bg-sky-50 transition-all duration-300 rounded-xl shadow-xs p-6 mt-1 border border-sky-50">
          <p className="text-gray-700 text-md font-medium leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};


const AccordionFAQ = () => {
  const leftColumn = faqData.slice(0, 3);
  const rightColumn = faqData.slice(3, 6);

  return (
    <div className="bg-white py-4 lg:pt-12 lg:pb-24 px-4 lg:px-20">
      <div className="flex flex-col justify-center items-center text-center pb-12 lg:pb-20">
        <h3 className="text-2xl lg:text-4xl font-bold tracking-wide">
          Frequently Asked Questions{" "}
          <span className="text-sky-500">(FAQs)</span>
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
        {/* Kiri */}
        <div className="flex-1">
          {leftColumn.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
        {/* Kanan */}
        <div className="flex-1">
          {rightColumn.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionFAQ;
