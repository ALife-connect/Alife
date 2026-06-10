import React from "react";
import { useNavigate } from "react-router-dom";

const WhyUs = () => {
  const navigate = useNavigate();
  
  return (
    <div className="what-makes-us-cnt">
      <h3>What makes SLODAT different</h3>
      <p className="section-subtitle"> Every detail of SLODAT is designed to make donating blood easier, safer, and more impactful.</p>

      <div className="step-box-cnt">
        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="Network icon" />
          </div>
          <h3>Trusted Network</h3>
          <p>We partner only with accredited hospitals and blood banks to ensure compliance and safety.</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="Availability icon" />
          </div>
          <h3>Real-Time Availability</h3>
          <p>Hospitals can instantly see where required blood types and voluntary donors are available.</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="Experience icon" />
          </div>
          <h3>Seamless Experience</h3>
          <p>From easy registration to securely tracking your donation timeline and medical history history.</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="Incentive icon" />
          </div>
          <h3>Incentives for Donors</h3>
          <p>Gain access to complimentary mini-health checkups and automated wellness perks.</p>
        </div>

        <div className="step-box">
          <div className="icon">
            <img src="/images/Group.png" alt="Mission icon" />
          </div>
          <h3>Impact-Driven Mission</h3>
          <p>Every single registration and reservation directly helps secure a life-saving match.</p>
        </div>
      </div>

      <button onClick={() => navigate('/hospitalsignup')} className="get-listed-btn">
        Get Listed
      </button>
    </div>
  );
};

export default WhyUs;