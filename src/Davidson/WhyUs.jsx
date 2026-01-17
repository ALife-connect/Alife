import React from "react";
import { useNavigate } from "react-router";

const WhyUs = () => {
  const nav = useNavigate()
  return (
    <div className="what-makes-us-cnt">
      <span
        style={{ fontFamily: "poppins", fontSize: "36px", fontWeight: "700" }}
      >
        What makes ALIVE different
      </span>
      <span style={{ fontFamily: "poppins", fontSize: "25px", fontWeight: "400", marginTop: "2%" }}> Every detail of ALIVE is designed to make donating blood easier, safer, and more impactful.</span>

      <div className="step-box-cnt">
        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="" />
          </div>
          <h3>Verified & Trusted Network</h3>
          <p>We partner only with accredited hospital and blood banks...</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="" />
          </div>
          <h3>Real Time Donor Availability</h3>
          <p>Hospitals can instantly see where donors are available...</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="" />
          </div>
          <h3>Seamless Donor Experience</h3>
          <p>From easy registration to tracking donation history...</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="" />
          </div>
          <h3>Incentives for Donors</h3>
          <p>Health checkups & wellness perks for donors.</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="" />
          </div>
          <h3>Impact-Driven Mission</h3>
          <p>Every donation directly saves lives...</p>
        </div>
      </div>

      <div className="get-listed-btn">
        <button onClick={() => nav('/hospitalsignup')}>
          Get Listed
        </button>
      </div>
    </div>
  );
};

export default WhyUs;
