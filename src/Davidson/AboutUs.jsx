import React from "react";
import "./aboutus.css";
import AboutHeader from "./AboutHeader";
import BridgingGap from "./BridgingGap";
import MissionVision from "./MissionVision";
// import Achievements from "./Achievements";
import WhyUs from "./WhyUs";
import Team from "./Team";

const AboutUs = () => {
  return (
    <div className="aboutus-cnt-body">
      <div className="main-cnt">
        <div className="about-content">
          <AboutHeader />
          <BridgingGap />
          <MissionVision />
          {/* <Achievements /> */}
          <WhyUs />
          <Team />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
