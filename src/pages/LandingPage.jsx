import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen max-w-[1440px] m-auto relative manrope">
      <Navbar />
      <Hero/>
    </div>
  );
};

export default LandingPage;
