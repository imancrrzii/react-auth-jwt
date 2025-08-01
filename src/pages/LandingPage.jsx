import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Feature from "../components/landing/Feature";
import SifinaDashboard from "../components/landing/SifinaDashboard";
import SifinaPortal from "../components/landing/SifinaPortal";
import AccordionFAQ from "../components/landing/AccordionFAQ.";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen max-w-[1440px] m-auto relative manrope">
      <Navbar />
      <Hero />
      <Feature />
      <SifinaDashboard />
      <SifinaPortal />
      <AccordionFAQ/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
