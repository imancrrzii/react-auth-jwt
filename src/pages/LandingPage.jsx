import { useEffect, useState } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Feature from "../components/landing/Feature";
import SifinaDashboard from "../components/landing/SifinaDashboard";
import SifinaPortal from "../components/landing/SifinaPortal";
import AccordionFAQ from "../components/landing/AccordionFAQ.";
import Footer from "../components/landing/Footer";
import { IoChevronUp } from "react-icons/io5";

const LandingPage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen max-w-[1440px] m-auto relative manrope">
      <Navbar />
      <Hero />
      <Feature />
      <SifinaDashboard />
      <SifinaPortal />
      <AccordionFAQ />
      <Footer />

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 2xl:right-[calc(50%-720px+32px)] p-4 z-20 bg-sky-400 hover:bg-sky-600 text-white rounded-full cursor-pointer"
        >
          <IoChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
