import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../Davidson/pages/BeaHero.css';

const BeaHero = () => {
  const navigate = useNavigate();
  const isRegistered = localStorage.getItem("user");

  const handlePrimaryClick = () => {
    if (isRegistered) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  const handleSecondaryClick = () => {
    navigate("/about");
  };

  return (
    <section className="cta-wrapper">
      <div className="cta-content-box">
        <h1>Ready to Become a Hero?</h1>
        <p className="cta-subtitle">
          Join thousands of everyday heroes making a life-saving impact. Your blood can save up to three lives.
        </p>
        
        <div className="cta-buttons">
          <button className="btn-brand-primary" onClick={handlePrimaryClick}>
            Become a Donor
          </button>
          <button className="btn-brand-secondary" onClick={handleSecondaryClick}>
            Learn More
          </button>
        </div>
        
        <div className="safety-container">
          <img src="/images/svg.png" alt="Safety shield verification icon" className="safety-icon" />
          <p className="cta-footer">100% Safety • Free Health Screening • Track Your Impact</p>
        </div>
      </div>
    </section>
  );
};

export default BeaHero;