import React from "react";
import "../Esther/styles/landing.css";
import Benefit from "../components/Benefit/Benefit";
import Sponsors from "../components/Sponsors/Sponsors";
import Impacts from "../components/impacts/Impacts";
import { useNavigate } from "react-router";
import BeaHero from "../Davidson/pages/BeaHero";

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div className="landing-main-wrapper">
      {/* Background Decorative Glow Element */}
      <div className="hero-glow-effect" aria-hidden="true"></div>

      <header className="hero-section">
        <div className="hero-container">
          
          {/* Modern Feature Pill */}
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">SLODAT Global Movement</span>
          </div>

          {/* Upgraded Scalable Headline */}
          <h1 className="hero-title">
            Saving Lives. One Donation At A Time.
          </h1>

          {/* Expanded Copy for Global Emergency Scope */}
          <p className="hero-subtitle">
            Connecting real-time generosity with urgent global needs. Whether it is 
            critical blood shortages, disaster relief, or emergency medical supplies, 
            SLODAT bridges the gap between willing helpers and crisis points instantly.
          </p>

          {/* Dual CTAs for Balance */}
          <div className="hero-cta-group">
            <button 
              className="btn btn-primary" 
              onClick={() => nav('/dashboard')}
            >
              Start Donating
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => nav('/request-help')}
            >
              Request Support
            </button>
          </div>

        </div>
      </header>

      {/* Subsequent Page Sections */}
      <Sponsors />
      <Benefit />
      <Impacts />
      <BeaHero />
    </div>
  );
};

export default LandingPage;