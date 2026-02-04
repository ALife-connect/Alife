import React from "react";
import "./aboutus.css";
import AboutHeader from "./AboutHeader";
import BridgingGap from "./BridgingGap";
import MissionVision from "./MissionVision";
import WhyUs from "./WhyUs";
import Team from "./Team";
import Our_story from "./Our_story";

const AboutUs = () => {
  return (
    <div className="aboutus-cnt-body">
      <div className="main-cnt">
        <div className="about-content">
          <AboutHeader />
          <BridgingGap />
          <Our_story />
          <MissionVision />
          <WhyUs />
          <Team />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
