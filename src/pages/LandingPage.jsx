import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Feature from "../components/landing/Feature";
import SifinaDashboard from "../components/landing/SifinaDashboard";

const LandingPage = () => {
  return (
    <div className="min-h-screen max-w-[1440px] m-auto relative manrope">
      <Navbar />
      <Hero/>
      <Feature/>
      <SifinaDashboard/>
    </div>
  );
};

export default LandingPage;
