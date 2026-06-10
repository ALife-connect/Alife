import React, { useEffect } from "react";
import "./aboutus.css";
import AboutHeader from "./AboutHeader";
import BridgingGap from "./BridgingGap";
import MissionVision from "./MissionVision";
import WhyUs from "./WhyUs";
import Team from "./Team";
import Our_story from "./Our_story";

const AboutUs = () => {
  // Ensure page views start smoothly from the top on route transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="aboutus-page-wrapper">
      <div className="aboutus-content-container">
        <AboutHeader />
        <BridgingGap />
        <Our_story />
        <MissionVision />
        <WhyUs />
        <Team />
      </div>
    </main>
  );
};

export default AboutUs;